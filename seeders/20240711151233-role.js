"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Role",
      [
        {
          roleName: "admin",
        },
        {
          roleName: "user",
        },
        {
          roleName: "product",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Role", null, {});
  },
};
