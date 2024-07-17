const db = require("../models");
const UserRole = db.UserRole;
const Role = db.Role;

async function insertUserRole(userId, roleId, transaction = null) {
  try {
    const userRole = await UserRole.create(
      { userId, roleId },
      { transaction }
    );

    const role = await Role.findByPk(roleId, { transaction });
    return { ...userRole.toJSON(), name: role.name };
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}


async function getUserRoleByUserId(userId) {
  try {
    const userRole = await UserRole.findOne({
      where: {
        userId: userId,
      },
    });
    return userRole;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getRoleName(userId) {
  try {
    const userRole = await UserRole.findOne({
      where: {
        userId: userId,
      },
    });
    const role = await Role.findByPk(userRole.roleId);
    return role.name;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function deleteUserRolesByUserId(userId) {
  try {
    const userRoles = await UserRole.destroy({
      where: {
        userId: userId,
      },
    });
    return { message: "Roles deleted successfully" };
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function updateUserRole(userId, roleId) {
  try {
    await UserRole.update(
      { roleId: roleId },
      {
        where: {
          userId: userId,
        },
      }
    );

    const updatedRole = await Role.findByPk(roleId);
    return { message: "User role updated successfully", name: updatedRole.name };
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

module.exports = {
  insertUserRole,
  getUserRoleByUserId,
  getRoleName,
  deleteUserRolesByUserId,
  updateUserRole,
};
