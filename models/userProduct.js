"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserProduct = sequelize.define(
    "UserProduct",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

  UserProduct.associate = function (models) {
    UserProduct.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
    UserProduct.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return UserProduct;
};
