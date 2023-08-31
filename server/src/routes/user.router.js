const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { template } = require('../template');
const { User, UserBand } = require('../../db/models');

const router = express.Router();

router.get('/checkUser', async (req, res) => {
  if (req.session.user) {
    const userCheck = req.session.user;
    const existingUser = await User.findOne({ where: { login: userCheck } });
    res.json(existingUser);
  } else {
    res.json({ status: 404 });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    console.log(user);

    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.user = user.login;
        req.session.userId = user.id;
        req.session.save(() => {
          res.json(user);
        });
      } else {
        res.json({ err: 'Пароль неверный' });
      }
    } else {
      res.json({ err: 'Такой пользователь не найден' });
    }
  } catch (error) {
    res.send('Чтото пошло не так', error);
  }
});

router.post('/register', async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    auth: {
      user: 'randomloremtext@outlook.com',
      pass: 'q1q2q3q4719800748',
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });
  try {
    const {
      name, login, email, password,
    } = req.body;
    // //* email options
    const mailOptions = {
      from: 'randomloremtext@outlook.com',
      to: email,
      subject: `Поздравляем ${name} !!!`,
      html: template,
    };
    //* send message to mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Ошибка отправки письма');
      } else {
        console.log('Письмо отправлено: ');
        res.send('Письмо отправлено');
      }
    });
    const existingUser = await User.findOne({ where: { email, login } });
    console.log(existingUser);
    if (existingUser) {
      return res.json({ error: 'Такой пользователь уже существует' });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      login,
      email,
      password: hash,
    });
    console.log('User created:', newUser);
    const user = await User.findOne({ where: { email } });
    req.session.user = user.login;
    req.session.userId = user.id;
    const userBand = await UserBand.create({
      band_id: 1,
      user_id: newUser.id,
    });
    res.json(newUser);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

module.exports = router;
