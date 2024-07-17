"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("User", [{}]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("User", [
      {
        userName: "huynhhuong",
        email: "huong@gmail.com",
        password: "12345678",
      },
      {
        userName: "huynhhuong123",
        email: "huong123@gmail.com",
        password: "12345678",
      },
      {
        userName: "huynhhuong456",
        email: "huong456@gmail.com",
        password: "12345678",
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
    await queryInterface.bulkDelete("User", null, {});
  },
};
