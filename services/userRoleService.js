const { UserRole } = require("../models");
const { Role } = require("../models");
const { User } = require("../models");
async function insertUserRole(userId, roleId) {
  try {
    const userRole = await UserRole.create({
      userId: userId,
      roleId: roleId,
    });

    const findRole = await Role.findOne({
      where: {
        id: roleId,
      },
    });

    return {
      ...userRole.toJSON(),
      name: findRole ? findRole.name : null,
    };
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getUserRoleByUserId(userId) {
  try {
    const roles = await Role.findAll({
      attributes: ["id", "name"],
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

async function getRoleName(userId) {
  try {
    const roleName = await Role.findOne({
      attributes: ["id", "name"],
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
    return roleName;
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

async function updateUserRole(userId, roleId) {
  try {
    const [updatedRows] = await UserRole.update(
      { roleId: roleId },
      { where: { userId: userId } }
    );

    if (updatedRows > 0) {
      let updatedUserRole = await Role.findOne({
        where: {
          id: roleId,
        },
      });
      return updatedUserRole;
    }
  } catch (error) {
    return { error: error.message, statusCode: 404 };
  }
}

module.exports = {
  insertUserRole,
  getUserRoleByUserId,
  deleteUserRolesByUserId,
  updateUserRole,
  getRoleName,
};
