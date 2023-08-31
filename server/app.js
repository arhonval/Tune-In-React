require("dotenv").config();
require("@babel/register");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");

const FileStore = require("session-file-store")(session);
const express = require("express");

const app = express();
// TODO soket.io
const http = require("http").Server(app);
const socketIo = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});
//

const profileRouter = require("./src/routes/profileRouter");

// Require routes
const newUserProfileRouter = require("./src/routes/newUserProfile.router");
const userRouter = require("./src/routes/user.router");
const tagsRouter = require("./src/routes/tags.router");
const logoutRouter = require("./src/routes/logout.router");
const AdsRouter = require("./src/routes/ads.router");
const allProfiles = require("./src/routes/allprofiles.router");
const bandRouter = require("./src/routes/bandRouter");
const chatRouter = require("./src/routes/chat.router");
// Cookie
const sessionConfig = {
  name: "ExamCookie",
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? "Секретное слово",
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};

const { PORT } = process.env ?? 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
// TODO socket on port
socketIo.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);
  socket.on("message", (data) => {
    console.log(data);
    socketIo.emit('response', data)
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/uploadsphoto", express.static("uploadsphoto"));
app.use("/uploadssong", express.static("uploadssong"));
app.use(session(sessionConfig)); // Подключаем сессии

// Routes
app.use("/logout", logoutRouter);
app.use("/profiles", profileRouter);
app.use("/ads", AdsRouter);
app.use("/chat", chatRouter);
app.use("/", newUserProfileRouter);
app.use("/", userRouter);
app.use("/", tagsRouter);
app.use("/", allProfiles);
app.use("/bands", bandRouter);
// app.listen(PORT, () => {
//   console.log(PORT);
// });
// TODO socket listen on port
http.listen(PORT, () => {
  console.log(PORT);
});
