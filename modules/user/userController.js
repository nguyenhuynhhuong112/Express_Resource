const {
  insertUser,
  getUserByUserId,
  getAllUsersWithRoles,
  deleteUserByUserId,
  updateUserById,
} = require("../../services/userService");

async function createUser(req, res) {
  const { userName, email, password, roleId } = req.body;

  try {
    let newUser;
    if (Array.isArray(roleId)) {
      newUser = await insertUser({ userName, email, password }, roleId);
    } else {
      newUser = await insertUser({ userName, email, password }, roleId);
    }

    if (newUser.error) {
      const statusCode = newUser.statusCode || 500;
      return res.status(statusCode).json({ error: newUser.error });
    }

    return res
      .status(200)
      .json({ message: "Create User Successfully", data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserRoleByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const userRole = await getUserByUserId(userId);
    if (userRole.error) {
      const statusCode = userRole.statusCode || 500;
      return res.status(statusCode).json({ error: userRole.error });
    }
    return res.status(200).json({
      message: "Get User Role By User Id Successfully",
      data: userRole,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const usersWithRoles = await getAllUsersWithRoles();
    if (usersWithRoles.error) {
      const statusCode = usersWithRoles.statusCode || 500;
      return res.status(statusCode).json({ error: usersWithRoles.error });
    }
    return res.status(200).json({
      message: "Get All Users With Roles Successfully",
      data: usersWithRoles,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;
    const userRoles = await deleteUserByUserId(userId);
    if (userRoles.error) {
      const statusCode = userRoles.statusCode || 500;
      return res.status(statusCode).json({ error: userRoles.error });
    }
    return res.status(200).json({
      message: "Delete User Role By User Id Successfully",
      data: userRoles,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  const { userId } = req.params;
  const { userName, email, password, roleIds } = req.body;

  try {
    const userData = { userName, email, password };
    const result = await updateUserById(userId, userData, roleIds);

    if (result.error) {
      const statusCode = result.statusCode || 500;
      return res.status(statusCode).json({ error: result.error });
    }

    return res.status(200).json({ message: "User updated successfully", data: result.user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
  createUser,
  getUserRoleByUserId,
  getAllUsers,
  deleteUser,
  updateUser
};
