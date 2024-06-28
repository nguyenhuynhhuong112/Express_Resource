'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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

  UserRole.associate = function(models) {
    UserRole.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    UserRole.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role'
    });
  };

  return UserRole;
};
