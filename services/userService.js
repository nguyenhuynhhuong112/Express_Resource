const { User } = require("../models");
const { UserRole } = require("../models");
const { Role } = require("../models");
const { Op } = require("sequelize");
const {
  insertUserRole,
  getUserRoleByUserId,
  deleteUserRolesByUserId,
  updateUserRole,
} = require("./userRoleService");
async function insertUser(user, roleIds) {
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ userName: user.userName }, { email: user.email }],
      },
    });

    if (existingUser) {
      const error = new Error(
        "User with this userName or email already exists"
      );
      error.statusCode = 404;
      throw error;
    }
    const newUser = await User.create(user);
    if (Array.isArray(roleIds)) {
      const userRoles = await Promise.all(
        roleIds.map((roleId) => insertUserRole(newUser.id, roleId))
      );
      return { newUser, userRoles };
    } else {
      const userRole = await insertUserRole(newUser.id, roleIds);
      return { newUser, userRole };
    }
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}
async function getUserByUserId(userId) {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    const userRole = await getUserRoleByUserId(userId);
    return { user, userRole };
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getAllUsersWithRoles() {
  try {
    const users = await User.findAll({
      attributes: ["id", "userName", "email", "createdAt", "updatedAt"],
      include: [
        {
          model: UserRole,
          as: "userRoles",
          attributes: ["roleId"],
          include: [
            {
              model: Role,
              as: "role",
              attributes: ["id", "name", "createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    return users;
    // const users = await User.findAll({
    //   include: [
    //     {
    //       model: UserRole,
    //       as: "userRoles",
    //       include: [
    //         {
    //           model: Role,
    //           as: "role",
    //         },
    //       ],
    //     },
    //   ],
    // });

    // const result = users.map(user => ({
    //   id: user.id,
    //   userName: user.userName,
    //   email: user.email,
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    //   roles: user.userRoles.map(userRole => ({
    //     id: userRole.role.id,
    //     name: userRole.role.name,
    //     createdAt: userRole.role.createdAt,
    //     updatedAt: userRole.role.updatedAt,
    //   })),
    // }));

    // return result;
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function deleteUserByUserId(userId) {
  try {
    const deleteUserRole = await deleteUserRolesByUserId(userId);
    if (deleteUserRole.statusCode === 204) {
      const numDeleted = await User.destroy({
        where: {
          id: userId,
        },
      });

      if (numDeleted > 0) {
        return { message: "User deleted successfully", statusCode: 204 };
      } else {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
    } else {
      return { error: "Failed to delete user roles", statusCode: 500 };
    }
  } catch (error) {
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function updateUserById(userId, userData, roleIds) {
  try {
    let user = await User.findByPk(userId);

    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }

    if (
      userData.userName !== undefined &&
      userData.userName !== user.userName
    ) {
      const existingUser = await User.findOne({
        where: {
          userName: userData.userName,
          id: { [Op.ne]: userId },
        },
      });
      if (existingUser) {
        throw new Error(`Username '${userData.userName}' is already taken.`);
      }
    }

    if (userData.email !== undefined && userData.email !== user.email) {
      const existingUser = await User.findOne({
        where: {
          email: userData.email,
          id: { [Op.ne]: userId },
        },
      });
      if (existingUser) {
        throw new Error(`Email '${userData.email}' is already registered.`);
      }
    }

    if (userData.userName !== undefined) {
      user.userName = userData.userName;
    }
    if (userData.email !== undefined) {
      user.email = userData.email;
    }
    if (userData.password !== undefined) {
      user.password = userData.password;
    }

    await user.save();

    if (roleIds && roleIds.length > 0) {
      await UserRole.destroy({
        where: {
          userId: userId,
        },
      });

      for (let roleId of roleIds) {
        await UserRole.create({
          userId: userId,
          roleId: roleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    return { user };
  } catch (error) {
    return { error: error.message, statusCode: 500 };
  }
}

module.exports = {
  insertUser,
  getUserByUserId,
  getAllUsersWithRoles,
  deleteUserByUserId,
  updateUserById,
};
