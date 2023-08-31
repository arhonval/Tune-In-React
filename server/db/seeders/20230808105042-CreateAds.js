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
    await queryInterface.bulkInsert("Ads", [
      {
        user_id: 2,
        type_id: 1,
        city: "Санкт-Петербург",
        title: "Ищу гитариста",
        body: "Ищу опытного лид-гитариста",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        type_id: 2,
        city: "Санкт-Петербург",
        title: "В поисках группы",
        body: "Барабанщик ищет металл-группу",
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
    await queryInterface.bulkDelete("Ads", null, {});
  },
};
