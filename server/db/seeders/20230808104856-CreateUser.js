"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        email: "9@9.com",
        login: "alex",
        password: await bcrypt.hash("1", 10),
        name: "Александр",
        type_id: 1,
        city: "Москва",
        photo: 'http://localhost:3000/uploadsphoto/alex.jpg',
        about: "Всем привет! Добро пожаловать на мою страницу.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "8@8.com",
        login: "example2",
        password: await bcrypt.hash("1", 10),
        name: "Олег Газманов",
        type_id: 2,
        city: "Тюмень",
        photo: 'http://localhost:3000/uploadsphoto/gazmanov.jpeg',
        about: "А я ясные дни...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "99@99.com",
        login: "example3",
        password: await bcrypt.hash("1", 10),
        name: "Дмитрий Рудаков",
        type_id: 3,
        city: "Санкт-Петербург",
        about: "Welcome to my page",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "88@88.com",
        login: "example4",
        password: await bcrypt.hash("1", 10),
        name: "Иван Иванов",
        type_id: 4,
        city: "Иваново",
        // photo: 'http://localhost:3000/uploadsphoto/gazmanov.jpeg',
        about: "Welcome to my page",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "999@999.com",
        login: "example5",
        password: await bcrypt.hash("1", 10),
        name: "Валерий Меладзе",
        type_id: 5,
        city: "Москва",
        photo: 'http://localhost:3000/uploadsphoto/meladze.jpg',
        about: "Welcome to my page",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "87@8.com",
        login: "example2",
        password: await bcrypt.hash("1", 10),
        name: "Михаил Тайпскриптер",
        type_id: 2,
        city: "Москва",
        // photo: 'http://localhost:3000/uploadsphoto/gazmanov.jpeg',
        about: "hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "68@8.com",
        login: "example2",
        password: await bcrypt.hash("1", 10),
        name: "Фермер Федор",
        type_id: 2,
        city: "Казань",
        // photo: 'http://localhost:3000/uploadsphoto/gazmanov.jpeg',
        about: "АПЕЛЬСИНЫЫЫ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
