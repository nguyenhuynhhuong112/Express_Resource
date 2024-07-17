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
    await queryInterface.bulkInsert("Product", [
      {
        productName: "Laptop",
        price: 1000,
        website: "www.laptop.com",
        type: "Electronic",
      },
      {
        productName: "Smartphone",
        price: 500,
        website: "www.smartphone.com",
        type: "Electronic",
      },
      {
        productName: "Shirt",
        price: 50,
        website: "www.shirt.com",
        type: "Clothing",
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
    await queryInterface.bulkDelete("Product", null, {});
  },
};
