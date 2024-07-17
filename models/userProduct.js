"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    static associate(models) {
      UserProduct.belongsTo(models.Product, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
      UserProduct.belongsTo(models.User, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
    }
  }
  UserProduct.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Product",
          key: "productId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "UserProduct",
      timestamps: false,
    }
  );

  return UserProduct;
};
