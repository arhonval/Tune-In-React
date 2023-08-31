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
    await queryInterface.bulkInsert("Messages", [
      {
        dialog_id: 1,
        body: "Hello!",
        sender_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dialog_id: 1,
        body: "Hi!",
        sender_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dialog_id: 2,
        body: "How are you?",
        sender_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dialog_id: 2,
        body: "Fine",
        sender_id: 3,
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
    await queryInterface.bulkDelete("Messages", null, {});
  },
};
