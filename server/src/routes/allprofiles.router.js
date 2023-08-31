const router = require('express').Router();
const {
  User, UserType, UserGenre, GenreTag, InstrumentTag, UserInstrument
} = require('../../db/models');

router.get('/profiles', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: UserType,
        attributes: ['name'],
      },
    ],
  });
  console.log(users);
  res.json(users);
});

router.post('/userGenres', async (req, res) => {
  const clickedTags = req.body;
  const genres = await GenreTag.findAll({
    where: {
      genre: clickedTags,
    },
  });
  //   console.log(genres);
  const genreIds = genres.map((genre) => genre.id);
  const usersByGenre = await UserGenre.findAll({
    where: {
      genre_id: genreIds,
    },
  });
  //   console.log(usersByGenre);

  const userIds = usersByGenre.map((el) => el.id);

  const users = await User.findAll({
    where: {
      id: userIds,
    },
    include: [
      {
        model: UserType,
        attributes: ['name'],
      },
    ],
  });
  res.json(users);
});

router.post('/userInst', async (req, res) => {
  const clickedTags = req.body;
  const instruments = await InstrumentTag.findAll({
    where: {
      instrument: clickedTags,
    },
  });
  //   console.log(genres);
  const instIds = instruments.map((el) => el.id);
  const usersByInst = await UserInstrument.findAll({
    where: {
      instrument_id: instIds,
    },
  });
  //   console.log(usersByGenre);

  const userIds = usersByInst.map((el) => el.id);

  const users = await User.findAll({
    where: {
      id: userIds,
    },
    include: [
      {
        model: UserType,
        attributes: ['name'],
      },
    ],
  });
  res.json(users);
});


module.exports = router;
