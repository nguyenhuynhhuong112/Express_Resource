"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );

  User.associate = function (models) {
    User.hasMany(models.UserRole, {
      foreignKey: "userId",
      as: "userRoles",
    });
    User.hasMany(models.UserProduct, {
      foreignKey: "userId",
      as: "userProducts",
    });
  };

  return User;
};
