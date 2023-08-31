const profileRouter = require("express").Router();
const {
  User,
  Follower,
  Song,
  UserType,
  UserGenre,
  UserInstrument,
  GenreTag,
  InstrumentTag,
  Band,
  UserBand,
} = require("../../db/models");
const multer = require("multer");

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

profileRouter.get("/follows", async (req, res) => {
  try {
    const userCheck = req.session.user;
    const existingUser = await User.findOne({ where: { login: userCheck } });
    const authFollowings = await Follower.findAll({
      where: { user_id: existingUser.id },
    });
    const authFollowers = await Follower.findAll({
      where: { follow_id: existingUser.id },
    });
    res.json({ authFollowings, authFollowers });
  } catch (error) {
    res.send(error);
  }
});

profileRouter.post("/follows", async (req, res) => {
  const { followId } = req.body;
  const userCheck = req.session.user;
  try {
    const existingUser = await User.findOne({
      where: { login: userCheck },
    });
    const newFollow = await Follower.create({
      user_id: existingUser.id,
      follow_id: followId,
    });
    res.json(newFollow);
  } catch (error) {
    res.send(error);
  }
});

profileRouter.delete("/follows", async (req, res) => {
  const { followId } = req.body;
  const userCheck = req.session.user;
  try {
    const existingUser = await User.findOne({
      where: { login: userCheck },
    });
    await Follower.destroy({
      where: { user_id: existingUser.id, follow_id: followId },
    });
    res.json({ unsubId: followId });
  } catch (error) {
    res.send(error);
  }
});

profileRouter.patch(
  "/photo/:login",
  uploadphoto.single("photo"),
  async (req, res) => {
    console.log("PATCH");
    console.log(req.body);
    console.log(req.file);
    const { login } = req.params;
    try {
      const photoFileName = req.file.filename;
      console.log("photoFileName:", photoFileName);
      const updateUserPhoto = await User.update(
        {
          photo: `http://localhost:3000/uploadsphoto/${photoFileName}`,
        },
        { where: { login } }
      );
      res.json(updateUserPhoto);
    } catch (error) {
      res.send(error);
    }
  }
);

profileRouter.post(
  "/song/:login",
  uploadsong.single("audio"),
  async (req, res) => {
    const { login } = req.params;
    const { name } = req.body;
    try {
      const audioFileName = req.file.filename;
      const user = await User.findOne({ where: { login } });
      const newSong = await Song.create({
        user_id: user.id,
        song_path: `http://localhost:3000/uploadssong/${audioFileName}`,
        name,
      });
      res.json(newSong);
    } catch (error) {
      res.send(error);
    }
  }
);

profileRouter.get("/:login", async (req, res) => {
  const { login } = req.params;
  try {
    const userMeta = await User.findOne({
      where: { login },
      include: [Follower, Song, UserType],
    });
    const user = userMeta.get({ plain: true });
    const genresMeta = await UserGenre.findAll({
      where: { user_id: user.id },
      include: [GenreTag],
    });
    const genres = genresMeta.map((el) => el.get({ plain: true }));
    const instrumentsMeta = await UserInstrument.findAll({
      where: { user_id: user.id },
      include: [InstrumentTag],
    });
    const instruments = instrumentsMeta.map((el) => el.get({ plain: true }));
    const followingsMeta = await Follower.findAll({
      where: { user_id: user.id },
      include: [
        {
          model: User,
          include: [UserType],
        },
      ],
    });
    const followings = followingsMeta.map((el) => el.get({ plain: true }));
    const bandsMeta = await UserBand.findAll({
      where: { user_id: user.id },
      include: [Band],
    });
    const bands = bandsMeta.map((el) => el.get({ plain: true }));
    // const followersMeta = await Follower.findAll({
    //   where: { follow_id: user.id },
    //   include: [
    //     {
    //       model: User,
    //     },
    //   ],
    // });
    // const followers = followersMeta.map((el) => el.get({ plain: true }));
    // console.log("user------->", user);
    // const following = await User.findAll({
    //   include: [
    //     {
    //       model: Follower,
    //       attributes: [],
    //       where: { user_id: user.id },
    //       include: [
    //         {
    //           model: User,
    //           attributes: ["id", "name", "email"], // Здесь вы можете указать нужные вам атрибуты
    //         },
    //       ],
    //     },
    //   ],
    // });
    // const follower = await User.findAll({
    //   include: [
    //     {
    //       model: Follower,
    //       attributes: [],
    //       where: { follow_id: user.id },
    //       include: [
    //         {
    //           model: User,
    //           attributes: ["id", "name", "email"], // Здесь вы можете указать нужные вам атрибуты
    //         },
    //       ],
    //     },
    //   ],
    // });
    res.json({
      user,
      genres,
      instruments,
      followings,
      bands,
    });
  } catch (error) {
    res.send(error);
  }
});

profileRouter.put("/:login", async (req, res) => {
  const { login } = req.params;
  console.log(req.body);
  // const { city, about, type, telegram, insta, youtube, soundcloud } = req.body;
  const { inputs, customGenres, customInstruments } = req.body;
  console.log("customInstruments:", customInstruments);
  console.log("customGenres:", customGenres);
  const { name, city, about, type, telegram, insta, youtube, soundcloud } =
    inputs;
  try {
    const userType = await UserType.findOne({ where: { name: type } });
    const updateUser = await User.update(
      {
        name,
        type_id: userType.id,
        city,
        about,
        telegram,
        insta,
        youtube,
        soundcloud,
      },
      { where: { login } }
    );
    console.log("updateUser:", updateUser);
    const userMeta = await User.findOne({
      where: { login },
      include: [Follower, Song, UserType],
    });
    const user = userMeta.get({ plain: true });
    console.log("user:", user);
    const deleteGenres = await UserGenre.destroy({
      where: { user_id: user.id },
    });
    const deleteInstruments = await UserInstrument.destroy({
      where: { user_id: user.id },
    });

    for (let i = 0; i < customGenres.length; i++) {
      console.log("new genre");
      await UserGenre.create({ user_id: user.id, genre_id: customGenres[i] });
    }

    for (let i = 0; i < customInstruments.length; i++) {
      console.log("new instrument");
      await UserInstrument.create({
        user_id: user.id,
        instrument_id: customInstruments[i],
      });
    }

    const genresMeta = await UserGenre.findAll({
      where: { user_id: user.id },
      include: [GenreTag],
    });
    const genres = genresMeta.map((el) => el.get({ plain: true }));
    console.log("genres:", genres);
    const instrumentsMeta = await UserInstrument.findAll({
      where: { user_id: user.id },
      include: [InstrumentTag],
    });
    const instruments = instrumentsMeta.map((el) => el.get({ plain: true }));
    console.log("instruments:", instruments);

    res.json({ user, genres, instruments });
  } catch (error) {
    res.send(error);
  }
});

module.exports = profileRouter;
