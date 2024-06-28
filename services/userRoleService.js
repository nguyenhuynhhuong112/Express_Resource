const { UserRole } = require("../models");
const { Role } = require("../models");
const { User } = require("../models");
async function insertUserRole(userId, roleId) {
  try {
    const userRole = await UserRole.create({
      userId: userId,
      roleId: roleId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return userRole;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getUserRoleByUserId(userId) {
  try {
    const roles = await Role.findAll({
      attributes: ["id", "name", "createdAt", "updatedAt"],
      include: [
        {
          model: UserRole,
          as: "userRoles",
          attributes: [],
          where: { userId: userId },
          include: [
            {
              model: User,
              as: "user",
              attributes: [],
            },
          ],
        },
      ],
    });

    return roles;
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
    if (userRoles > 0) {
      return { message: "User roles deleted successfully", statusCode: 204 };
    } else {
      const error = new Error("UserRoles not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}



module.exports = {
  insertUserRole,
  getUserRoleByUserId,
  deleteUserRolesByUserId,
};
