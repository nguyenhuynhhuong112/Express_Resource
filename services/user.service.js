const db = require("../models");
const User = db.User;
const Role = db.Role;
const UserRole = db.UserRole;
const { sequelize } = require("../models");
const { Op } = require("sequelize");

async function findUserByExists(email, userName) {
  const transaction = await sequelize.transaction();
  try {
    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { userName }],
      },
      transaction,
    });
    await transaction.commit();
    return { exists: userExists ? true : false };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function createUserService(user) {
  const transaction = await sequelize.transaction();
  try {
    const createUser = await User.create(user, { transaction });
    const createUserRole = await UserRole.create(
      {
        userId: createUser.userId,
        roleId: user.roleId,
      },
      { transaction }
    );
    await transaction.commit();
    return { result: { createUser, createUserRole }, statusCode: 201 };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getUserByIdService(id) {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: UserRole,
          include: [
            {
              model: Role,
              attributes: ["roleName"],
            },
          ],
        },
      ],
      transaction,
    });
    await transaction.commit();
    return { result: user, statusCode: 200 };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function getAllUsersService() {
  const transaction = await sequelize.transaction();
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserRole,
          include: [
            {
              model: Role,
              attributes: ["roleName"],
            },
          ],
        },
      ],
      transaction,
    });
    await transaction.commit();
    return { result: users, statusCode: 200 };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function deleteUserService(id) {
  const transaction = await sequelize.transaction();
  try {
    await UserRole.destroy({
      where: { userId: id },
      transaction,
    });
    await User.destroy({
      where: { userId: id },
      transaction,
    });
    await transaction.commit();
    return {
      message: "Delete successfully",
      statusCode: 200,
    };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function updateUserService(id, updateData, transaction) {
  try {
    const [numberOfAffectedRows] = await User.update(updateData, {
      where: { userId: id },
      transaction,
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Update failed");
    }

    return { message: "User updated successfully", statusCode: 200 };
  } catch (error) {
    throw { error: error.message, statusCode: error.statusCode || 500 };
  }
}

async function userLoginService(email, password) {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findOne({
      where: { email, password },
      transaction,
    });
    await transaction.commit();
    return { result: user, statusCode: 200 };
  } catch (error) {
    await transaction.rollback();
    return { error: error.message, statusCode: error.statusCode || 500 };
  }
}

module.exports = {
  createUserService,
  findUserByExists,
  getUserByIdService,
  getAllUsersService,
  deleteUserService,
  updateUserService,
  userLoginService,
};
