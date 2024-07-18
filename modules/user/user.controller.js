const { sequelize } = require("../../models");
const service = require("../../services/user.service");

async function createUser(req, res) {
  const transaction = await sequelize.transaction();
  const { userName, email, password, roleId } = req.body;
  try {
    if (!userName || !email || !password || !roleId) {
      return res
        .status(400)
        .json({ error: "Missing required fields", statusCode: 400 });
    }
    const userExists = await service.findUserByExists(
      email,
      userName,
      transaction
    );
    if (userExists.exists) {
      return res
        .status(400)
        .json({ error: "User already exists", statusCode: 400 });
    }
    const createUser = await service.createUserService(req.body, transaction);

    if (createUser.statusCode === 201) {
      const user = await service.getUserByIdService(
        createUser.result.createUser.userId,
        transaction
      );
      await transaction.commit();
      return res.status(user.statusCode).send(user);
    } else {
      await transaction.rollback();
      return res.status(createUser.statusCode).json({ error: createUser });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function getOneUser(req, res) {
  const transaction = await sequelize.transaction();
  const { id } = req.params;
  try {
    const userExists = await service.getUserByIdService(id, transaction);
    if (!userExists.result) {
      return res.status(404).json({ error: "User not found", statusCode: 404 });
    }
    const user = await service.getUserByIdService(id, transaction);
    await transaction.commit();
    return res.status(user.statusCode).send(user);
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function getAllUser(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const users = await service.getAllUsersService(transaction);
    await transaction.commit();
    return res.status(users.statusCode).send(users);
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  const transaction = await sequelize.transaction();
  const { id } = req.params;
  try {
    const userExists = await service.getUserByIdService(id, transaction);
    if (!userExists.result) {
      return res.status(404).json({ error: "User not found", statusCode: 404 });
    }
    const user = await service.deleteUserService(id, transaction);
    await transaction.commit();
    return res.status(user.statusCode).send(user);
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  const transaction = await sequelize.transaction();
  const { id } = req.params;

  try {
    const userExists = await service.getUserByIdService(id, transaction);
    if (!userExists.result) {
      await transaction.rollback();
      return res.status(404).json({ error: "User not found", statusCode: 404 });
    }

    const updateData = {};
    if (req.body.userName && req.body.userName !== userExists.result.userName) {
      updateData.userName = req.body.userName;
    }
    if (req.body.email && req.body.email !== userExists.result.email) {
      updateData.email = req.body.email;
    }
    if (req.body.password) {
      updateData.password = req.body.password;
    }

    if (
      req.body.roleId &&
      req.body.roleId !== userExists.result.UserRoles.roleId
    ) {
      updateData.roleId = req.body.roleId;
    }

    if (Object.keys(updateData).length > 0) {
      const updateResult = await service.updateUserService(
        id,
        updateData,
        transaction
      );
      if (updateResult.error) {
        throw new Error(updateResult.error);
      }

      await transaction.commit();
      return res.status(200).json({
        message: "User updated successfully",

        statusCode: 200,
      });
    } else {
      await transaction.rollback();
      return res
        .status(400)
        .json({ error: "Missing required fields", statusCode: 400 });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function userLogin(req, res) {
  const transaction = await sequelize.transaction();
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields", statusCode: 400 });
    }
    const user = await service.userLoginService(email, password, transaction);
    if (!user.result) {
      return res.status(404).json({ error: "Try again", statusCode: 404 });
    } else {
      const userInfo = await service.getUserByIdService(
        user.result.userId,
        transaction
      );
      await transaction.commit();
      return res.status(userInfo.statusCode).send(userInfo);
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getOneUser,
  getAllUser,
  deleteUser,
  updateUser,
  userLogin,
};
