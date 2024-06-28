'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

  User.associate = function(models) {
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: 'userId',
      otherKey: 'roleId',
      as: 'roles'
    });
    User.hasMany(models.UserRole, {
      foreignKey: 'userId',
      as: 'userRoles'
    });
  };

  return User;
};
