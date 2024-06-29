"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsToMany(models.User, {
      through: models.UserProduct,
      foreignKey: "productId",
      otherKey: "userId",
      as: "products",
    });
    Product.hasMany(models.UserProduct, {
      foreignKey: "productId",
      as: "userProducts",
    });
  };
  return Product;
};
