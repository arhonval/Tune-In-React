const express = require('express');

const router = express.Router();

const {
  UserType, User, UserGenre, UserInstrument, GenreTag, InstrumentTag,
} = require('../../db/models');

router.get('/userTypes', async (req, res) => {
  try {
    const userTypes = await UserType.findAll();
    const userTypesNames = userTypes.map((el) => el.name);
    res.json(userTypesNames);
  } catch (error) {
    console.error('Error fetching user types:', error);
    res.status(500).json({ error: 'An error occurred while fetching user types' });
  }
});

router.patch('/newuser/stepone', async (req, res) => {
  console.log(req.session.user);
  const user = await User.findOne({ where: { login: req.session.user } });
  const typeId = await UserType.findOne({ where: { name: req.body.type } });
  await User.update({
    city: req.body.city,
    telegram: req.body.telegram,
    type_id: typeId.id,
  }, {
    where: { login: user.login },
  });
  res.json({ message: 'User profile updated successfully' });
});

router.post('/newuser/steptwo', async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ where: { login: req.session.user } });

  const { clickedGenres, clickedInstruments, about } = req.body;

  const genreTags = [];
  const instrumentTags = [];

  for (const el of clickedGenres) {
    const genreTag = await GenreTag.findOne({
      where: {
        genre: el,
      },
      raw: true,
    });
    console.log(genreTag);
    genreTags.push(genreTag);
  }

  for (const el of clickedInstruments) {
    const instTag = await InstrumentTag.findOne({
      where: {
        instrument: el,
      },
      raw: true,
    });
    console.log(instTag);
    instrumentTags.push(instTag);
  }

  const userGenres = [];
  const userInstruments = [];

  for (const el of genreTags) {
    const checkGenre = await UserGenre.findOne({
      where: {
        user_id: user.id,
        genre_id: el.id,
      },
    });
    if (!checkGenre) {
      const result = await UserGenre.create({
        user_id: user.id,
        genre_id: el.id,
      });
      userGenres.push(result);
    }
  }

  for (const el of instrumentTags) {
    const checkInst = await UserInstrument.findOne({
      where: {
        user_id: user.id,
        instrument_id: el.id,
      },
    });
    if (!checkInst) {
      const result = await UserInstrument.create({
        user_id: user.id,
        instrument_id: el.id,
      });
      userInstruments.push(result);
    }
  }

  await User.update({
    about,
  }, {
    where: {
      id: user.id,
    },
  });

  res.json({ message: 'User profile saved successfully' });
});

module.exports = router;
