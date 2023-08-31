#!/bin/bash
#  Файл выполняет установку sequelize для postgres, express, ReactSSR

# Для того что бы все сработало:
# 1) chmod +x miniScript_orig.sh  // файл по умолчанию не исполняемый, перед запуском выполнить эту команду в консоли где расположен файл.
# 2) кидаете его в корень нового проекта.
# 3) Теперь файл можно запускать, введя ./miniScript_orig.sh в консоли.


npm init -y
npx eslint --init
npx create-gitignore node 
npm i sequelize pg pg-hstore
npm i sequelize-cli 

npm i express morgan 
npm i -D nodemon

npm i @babel/core @babel/preset-env @babel/preset-react @babel/register react react-dom

npm i dotenv express-session session-file-store bcrypt 

npm i http-errors



mkdir -p public/js
mkdir -p public/images
mkdir -p public/css
mkdir -p src/lib
mkdir -p src/middlewares
mkdir -p src/routes
mkdir -p src/views

# надо дописать в json

# "scripts": {
#     "test": "echo \"Error: no test specified\" && exit 1",
#    "start": "node app.js",
#     "dev": "nodemon app.js --ext js,jsx --ignore sessions"
#   },


echo "const path = require('path');
require('dotenv').config()

 module.exports = {
  'config': path.resolve('db',  'config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
 };" > .sequelizerc


npx sequelize-cli init

echo '{
  "development": {
    "use_env_variable": "DEV_DB_URL",
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "TEST_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "PROD_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "seederStorage": "sequelize",
  "seederStorageTableName": "SequelizeData"
}' > ./db/config/database.json


echo "const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_URL);

module.exports = async function dbConnectCheck() {
  try {
    await sequelize.authenticate();
    console.log('БАЗА ПОДКЛЮЧЕНА!');
  } catch (error) {
    console.log('БАЗА НЕ ПОДКЛЮЧЕНА ==>', error);
  }
};" > db/dbConnectCheck.js 

echo "
function isAuth(req, res, next) {
  const user = req.session?.user;
  if (!user) {
    return res.redirect('/login');
  }
  next();
}

module.exports = isAuth;" > src/middlewares/isAuth.js

echo 'PORT=3000
DEV_DB_URL=postgres://postgres:postgres@localhost:5432/db_exam_raccons
TEST_DB_URL=postgres://postgres:postgres@localhost:5432/db_name
PROD_DB_URL=postgres://postgres:postgres@localhost:5432/db_name
SECRET_KEY_SESSION=lollipop'> .env 

echo 'PORT=3ХХХ
DEV_DB_URL=[dialect]://[user]:[password]@[hostname]:[PORT]/[db_name]
TEST_DB_URL=[dialect]://[user]:[password]@[hostname]:[PORT]/[db_name]
PROD_DB_URL=[dialect]://[user]:[password]@[hostname]:[PORT]/[db_name]
SECRET_KEY_SESSION=[кодовое слово]'> .env_example

echo '{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": "> 5%",
          "modules": false
        }
      ],
      "@babel/preset-react"
    ]
  }' > .babelrc


echo "require('dotenv').config();
require('@babel/register');

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const dbConnectCheck = require('./db/dbConnectCheck');
const isAuth = require('./src/middlewares/isAuth');

// Require routes

// Cookie
const sessionConfig = {
  name: 'ExamCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};
const app = express();
const { PORT } = process.env ?? 3000;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(session(sessionConfig));// Подключаем сессии

dbConnectCheck();

// Routes

app.listen(PORT, () => {
  console.log(`Сервер крутится на ${PORT} порту`);
});
"> app.js

echo ".container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 768px) {
  .container {
    max-width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
" > public/css/style.css

echo "
" > ./public/js/application.js


# первый вариант renderTemplate

echo "require('@babel/register');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = function renderTemplate(
  reactElement,
  properties,
  request,
  response
) {
  const reactEl = React.createElement(reactElement, {
    ...properties,
    user1: request.session?.user?.,
  });
  const html = ReactDOMServer.renderToStaticMarkup(reactEl);
  response.write('<!DOCTYPE html>');
  response.write(html);
  response.end();
};
" > ./src/lib/renderTemplate.js

# второй вариант renderTemplate

#echo "require('@babel/register');
#const React = require('react');
#const ReactDOMServer = require('react-dom/server');

#function renderTemplate(Component, props, res, req) {
#  const reactEl = React.createElement(Component, {
#    ...props,
#    ...res.app.locals,
 #   ...res.locals,
 #   userSession: req.session || {},
#
#  });
#  const html = ReactDOMServer.renderToStaticMarkup(reactEl);
#  res.write('<!DOCTYPE html>');
#  res.write(html);
#  res.end();
#}

#module.exports = renderTemplate;" > ./src/lib/renderTemplate.js

exports DEV_DB_URL=postgres://postgres:postgres@localhost:5432/[dbName]
npx sequelize-cli db:create
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string 
