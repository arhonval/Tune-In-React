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
    await queryInterface.bulkInsert("InstrumentTags", [
      {
        instrument: "Гитара",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instrument: "Ударные",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instrument: "Клавишные",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instrument: "Вокал",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instrument: "Духовые",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instrument: "Струнные смычковые",
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
    await queryInterface.bulkDelete("InstrumentTags", null, {});
  },
};
