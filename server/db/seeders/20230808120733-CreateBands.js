"use strict";

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
    await queryInterface.bulkInsert("Bands", [
      {
        name: "Tune In",
        city: "Москва",
        about: "Welcome to Tune In",
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Незнакомцы",
        city: "Санкт-Петербург",
        about: "Самая незнакомая группа",
        admin_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Пельмени и Рок-н-ролл",
        city: "Санкт-Петербург",
        about: "Добро пожаловать в группу пельменей",
        photo: "http://localhost:3000/uploadsphoto/coolpel.jpeg",
        admin_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Альтер Эго",
        city: "Санкт-Петербург",
        about: "Welcome to my page",
        admin_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Шаловливые Шаурмы",
        city: "Санкт-Петербург",
        about: "Welcome to my page",
        admin_id: 5,
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
    await queryInterface.bulkDelete("Bands", null, {});
  },
};
