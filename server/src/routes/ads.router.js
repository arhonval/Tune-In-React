const express = require('express');

const router = express.Router();
const TelegramApi = require('node-telegram-bot-api');
const { Ad, User } = require('../../db/models');

const { TOKEN, CHANEL } = process.env;

const bot = new TelegramApi(TOKEN, { polling: true });
bot.on('message', (msg) => console.log(msg));

// TODO get ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.findAll({ include: [User], raw: true, nest: true });
    res.json(ads);
  } catch (error) {
    console.error('Error getting ads:', error);
    res.status(500).json({ error: 'Error getting ads' });
  }
});

// TODO post new ads
router.post('/new', async (req, res) => {
  try {
    await Ad.create(req.body);
    const newPost = await Ad.findOne({
      include: [User],
      where: { title: req.body.title, user_id: req.body.user_id },
      raw: true,
      nest: true,
    });
    // TODO sendMessage telegram
    bot.sendMessage(
      CHANEL,
      ` ${
        newPost.type_id == 1
          ? `🧨🧨🧨Группа - ${newPost.User.name}`
          : `🧨🧨🧨Пользователь - ${newPost.User.name}`
      } ✅\n\n📌${newPost.city}\n\n📌${newPost.title}\n\n📌${
        newPost.body
      }\n\n📌${
        newPost.User.telegram
          ? newPost.User.telegram
          : `http://localhost:5173/profiles/${newPost.User.login}`
      }`,
      {
        parse_mode: 'Markdown',
      },
    );
    res.json(newPost);
  } catch (error) {
    console.error('Error posting ads:', error);
    res.status(500).json({ error: 'Error posting ads' });
  }
});

// TODO patch ads
router.patch('/:id', async (req, res) => {
  try {
      await Ad.update(req.body, { where: { id: req.params.id } });
    const newPost = await Ad.findOne({
      include: [User],
      where: { title: req.body.title, user_id: req.body.user_id },
      raw: true,
      nest: true,
    });
    // TODO sendMessage telegram
    bot.sendMessage(
      CHANEL,
      ` ${
        newPost.type_id == 1
          ? `🧨🧨🧨Группа - ${newPost.User.name}`
          : `🧨🧨🧨Пользователь - ${newPost.User.name}`
      } ✅\n\n📌${newPost.city}\n\n📌${newPost.title}\n\n📌${
        newPost.body
      }\n\n📌${
        newPost.User.telegram
          ? newPost.User.telegram
          : `http://localhost:5173/profiles/${newPost.User.login}`
      }`,
      {
        parse_mode: 'Markdown',
      },
    );
    res.json(newPost);
  } catch (error) {
    console.error('Error patching ads:', error);
    res.status(500).json({ error: 'Error patching ads' });
  }
});
// TODO delete ad
router.delete('/', async (req, res) => {
  const { id } = req.body;
  try {
    await Ad.destroy({ where: { id } });

    res.json({ id });
  } catch (error) {
    console.error('Error patching ads:', error);
    res.status(500).json({ error: 'Error patching ads' });
  }
});

module.exports = router;
// TODO test url
// https://api.telegram.org/bot6011020154:AAFbAW8WOpge_C8rwHPtUz6eK7i1gbRQFsI/sendMessage?chat_id=822536084&text=%22Ffffff%22
