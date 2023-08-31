const messageRouter = require("express").Router();
const { Op } = require("sequelize");
const { Dialog, Message, User } = require("../../db/models");

messageRouter.get("/", async (req, res) => {
  try {
    const userCheck = req.session.user;
    const existingUser = await User.findOne({ where: { login: userCheck } });
    console.log("existingUser:", existingUser);
    const dialogsMeta = await Dialog.findAll({
      where: {
        [Op.or]: [{ user1_id: existingUser.id }, { user2_id: existingUser.id }],
      },
      include: [
        {
          model: User,
          as: "user1",
          attributes: ["name", "photo"],
        },
        {
          model: User,
          as: "user2",
          attributes: ["name", "photo"],
        },
      ],
    });
    const dialogs = dialogsMeta.map((el) => el.get({ plain: true }));
    console.log("dialogs:", dialogs);
    res.json(dialogs);
  } catch (error) {
    res.send(error);
  }
});

messageRouter.post("/new", async (req, res) => {
  const { id } = req.body;
  try {
    const userCheck = req.session.user;
    const existingUser = await User.findOne({ where: { login: userCheck } });
    const newDialog = await Dialog.create({
      user1_id: existingUser.id,
      user2_id: id,
    });
    res.json(newDialog);
  } catch (error) {
    res.send(error);
  }
});

messageRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const messagesMeta = await Message.findAll({
      where: { dialog_id: id },
      include: [
        {
          model: User,
          attributes: ["name", "photo"],
        },
      ],
    });
    const messages = messagesMeta.map((el) => el.get({ plain: true }));
    const dialogMeta = await Dialog.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "user1",
          attributes: ["name", "photo"],
        },
        {
          model: User,
          as: "user2",
          attributes: ["name", "photo"],
        },
      ],
    });
    const dialog = dialogMeta.get({ plain: true });
    res.json({ dialog, messages });
  } catch (error) {
    res.send(error);
  }
});

messageRouter.post("/:id", async (req, res) => {
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
    res.json(newMessage);
  } catch (error) {
    res.send(error);
  }
});

module.exports = messageRouter;
