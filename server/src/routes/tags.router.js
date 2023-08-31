const express = require('express');

const { UserGenre, UserInstrument, GenreTag, InstrumentTag } = require('../../db/models');

const router = express.Router();

router.get('/genres', async (req, res) => {
  try {
    const genres = await GenreTag.findAll();
    res.json(genres);
    console.log(genres);
  } catch (error) {
    res.json({ error: 'cannot get user genres' });
  }
});

router.get('/instruments', async (req, res) => {
  try {
    const instruments = await InstrumentTag.findAll();
    res.json(instruments);
  } catch (error) {
    res.json({ error: 'cannot get user instruments' });
  }
});

module.exports = router;
