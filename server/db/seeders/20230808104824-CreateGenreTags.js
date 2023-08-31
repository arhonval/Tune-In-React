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
    await queryInterface.bulkInsert("GenreTags", [
      {
        genre: "Рок",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Классика",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Хип-хоп",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Джаз",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Блюз",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Шансон",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Электронная музыка",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Металл",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Поп-музыка",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        genre: "Народная музыка",
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
    await queryInterface.bulkDelete("GenreTags", null, {});
  },
};
