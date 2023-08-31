const bandRouter = require("express").Router();
const multer = require("multer");
const { Band, User, SongBand, UserBand, UserType } = require("../../db/models");
const { Op } = require("sequelize");

const photoStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploadsphoto");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const songStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploadssong");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadphoto = multer({ storage: photoStorage });
const uploadsong = multer({ storage: songStorage });

bandRouter.get("/", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});

bandRouter.post("/new", async (req, res) => {
  const { id } = req.body;
  try {
    const newBand = await Band.create({ name: "Новая группа", admin_id: id });
    const newBandMember = await UserBand.create({
      band_id: newBand.id,
      user_id: id,
    });
    const bandMemberMeta = await UserBand.findOne({
      where: { id: newBandMember.id },
      include: [User],
    });
    const bandMember = bandMemberMeta.get({ plain: true });
    console.log("newBand:", newBand);
    const notBandMembersMeta = await User.findAll({
      include: [
        {
          model: UserBand,
          attributes: [],
          where: {
            band_id: {
              [Op.ne]: newBand.id,
            },
            user_id: {
              [Op.ne]: bandMember.user_id,
            },
          },
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    const notBandMembers = notBandMembersMeta.map((el) =>
      el.get({ plain: true })
    );
    res.json({ newBand, bandMember, notBandMembers });
  } catch (error) {
    res.send(error);
  }
});

bandRouter.post("/newmember", async (req, res) => {
  const { userId, bandId } = req.body;
  try {
    const newMember = await UserBand.create({
      band_id: bandId,
      user_id: userId,
    });
    console.log("newMember=====================>:", newMember.id);
    const membersMeta = await UserBand.findAll({
      where: { band_id: bandId },
      include: [User],
    });
    console.log("membersMeta===================>:", membersMeta);
    const members = membersMeta.map((el) => el.get({ plain: true }));
    console.log("members================>:", members);
    res.json({ members, userId });
  } catch (error) {
    res.send(error);
  }
});

bandRouter.patch(
  "/photo/:id",
  uploadphoto.single("photo"),
  async (req, res) => {
    const { id } = req.params;
    const photoFileName = req.file.filename;
    try {
      const updateBandPhoto = await Band.update(
        { photo: `http://localhost:3000/uploadsphoto/${photoFileName}` },
        { where: { id } }
      );
      res.json(updateBandPhoto);
    } catch (error) {
      res.send(error);
    }
  }
);

bandRouter.post("/song/:id", uploadsong.single("audio"), async (req, res) => {
  console.log("=========>", req.params);
  const { id } = req.params;
  console.log("band:", band);
  const { name } = req.body;
  const audioFileName = req.file.filename;
  try {
    const findBand = await Band.findOne({ where: { id } });
    console.log("findBand:", findBand);
    const newBandSong = await SongBand.create({
      band_id: findBand.id,
      song_path: `http://localhost:3000/uploadssong/${audioFileName}`,
      name,
    });
    console.log("newBandSong:", newBandSong);
    res.json(newBandSong);
  } catch (error) {
    res.send(error);
  }
});

bandRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bandMeta = await Band.findOne({
      where: { id },
      include: [User, SongBand],
    });
    const band = bandMeta.get({ plain: true });
    const bandMembersMeta = await UserBand.findAll({
      where: { band_id: band.id },
      include: [
        {
          model: User,
          include: [UserType],
        },
      ],
    });
    const bandMembers = bandMembersMeta.map((el) => el.get({ plain: true }));
    // const notBandMembersMeta = await UserBand.findAll({
    //   where: {
    //     band_id: {
    //       [Op.ne]: band.id,
    //     },
    //   },
    //   include: [User],
    // });
    // const notBandMembers = notBandMembersMeta.map((el) =>
    //   el.get({ plain: true })
    // );
    const membersIds = bandMembers.map((el) => el.user_id);

    const notBandMembersMeta = await User.findAll({
      include: [
        {
          model: UserBand,
          where: {
            band_id: {
              [Op.ne]: band.id,
            },
            user_id: {
              [Op.notIn]: membersIds,
            },
          },
        },
        {
          model: UserType,
        },
      ],
    });

    const notBandMembers = notBandMembersMeta.map((el) =>
      el.get({ plain: true })
    );
    console.log("notBandMembers:", notBandMembers);

    res.json({ band, bandMembers, notBandMembers, membersIds });
  } catch (error) {
    res.send(error);
  }
});

bandRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("PARAMS", req.params);
  console.log("BODY", req.body);

  const { inputs } = req.body;
  const { name, city, about, telegram, insta, youtube, soundcloud } = inputs;

  try {
    const updateBand = await Band.update(
      { name, city, about, telegram, insta, youtube, soundcloud },
      { where: { id } }
    );
    const bandMeta = await Band.findOne({
      where: { id },
      include: [User, SongBand],
    });
    const band = bandMeta.get({ plain: true });
    console.log("band:", band);
    res.json(band);
  } catch (error) {
    res.send(error);
  }
});

module.exports = bandRouter;
