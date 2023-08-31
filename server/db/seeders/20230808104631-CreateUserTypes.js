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
    await queryInterface.bulkInsert("UserTypes", [
      {
        name: "Музыкант",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Продюссер",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Композитор",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Сонграйтер",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Саунд дизайнер",
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
    await queryInterface.bulkDelete("UserTypes", null, {});
  },
};
