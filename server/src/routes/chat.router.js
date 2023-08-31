const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');
const { Dialog, Message, User } = require('../../db/models');

// TODO get ads
router.get('/', async (req, res) => {
  try {
    const { userId } = req.session;

    const list1meta = await Dialog.findAll({
      where: {
        [Op.or]: [{ user1_id: userId }, { user2_id: userId }],
      },
      include: [
        {
          model: User,
          as: 'user_1',
          attributes: ['name', 'photo'],
        },
        {
          model: User,
          as: 'user_2',
          attributes: ['name', 'photo'],
        },
        {
          model: Message,
        },
      ],
      // raw: true,
      // nest: true,
    });

    const list1 = list1meta.map((el) => el.get({ plain: true }));
    console.log('list1:', list1);

    // console.log("list1:", list1);
    const list2 = await Dialog.findAll({
      include: [
        {
          model: User,
          as: 'user_1',
          // attributes: ["name", "photo"],
        },
      ],
      where: { user2_id: userId },
      raw: true,
      nest: true,
    });
    // console.log("list2:", list2);
    // console.log("======>", [...list1, ...list2]);
    res.json([...list1]);
  } catch (error) {
    console.error('Error getting ads:', error);
    res.status(500).json({ error: 'Error getting ads' });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const userCheck = req.session.user;
//     const existingUser = await User.findOne({ where: { login: userCheck } });
//     console.log("existingUser:", existingUser);
//     const dialogsMeta = await Dialog.findAll({
//       where: {
//         [Op.or]: [{ user1_id: existingUser.id }, { user2_id: existingUser.id }],
//       },
//       include: [
//         {
//           model: User,
//           as: "user1",
//           attributes: ["name", "photo"],
//         },
//         {
//           model: User,
//           as: "user2",
//           attributes: ["name", "photo"],
//         },
//       ],
//     });
//     const dialogs = dialogsMeta.map((el) => el.get({ plain: true }));
//     console.log("dialogs:", dialogs);
//     res.json(dialogs);
//   } catch (error) {
//     res.send(error);
//   }
// });

router.post('/new', async (req, res) => {
  const { id } = req.body;
  try {
    const userCheck = req.session.user;
    const existingUser = await User.findOne({ where: { login: userCheck } });
    const newDialog = await Dialog.create({
      user1_id: existingUser.id,
      user2_id: id,
    });
    const dialog = await Dialog.findOne({
      where: { id: newDialog.id },
      include: [
        {
          model: User,
          as: 'user_1',
        },
        {
          model: User,
          as: 'user_2',
        },
      ],
      raw: true,
      nest: true,
    });
    res.json(dialog);
  } catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;
  try {
    const messagesMeta = await Message.findAll({
      where: { dialog_id: id },
      include: [User],
    });
    const messages = messagesMeta.map((el) => el.get({ plain: true }));
    const dialogMeta = await Dialog.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user_1',
          attributes: ['name', 'photo', 'login'],
        },
        {
          model: User,
          as: 'user_2',
          attributes: ['name', 'photo', 'login'],
        },
      ],
    });
    // console.log(messages);
    const dialog = dialogMeta.get({ plain: true });
    res.json({ dialog, messages });
  } catch (error) {
    res.send(error);
  }
});

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  try {
    const userCheck = req.session.user;
    const existingUser = await User.findOne({ where: { login: userCheck } });
    const newMessage = await Message.create({
      dialog_id: id,
      body,
      sender_id: existingUser.id,
    });
    const messageMeta = await Message.findOne({
      where: { id: newMessage.id },
      include: [
        {
          model: User,
          attributes: ['name', 'photo'],
        },
      ],
    });
    const message = messageMeta.get({ plain: true });
    res.json(message);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
