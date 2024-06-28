const express= require('express');
const router = express.Router();
const userController = require('./userController')
const {validateUser} = require('./validateUser')
router.post('/create-user',validateUser, userController.createUser)
router.get('/get-user/:userId', userController.getUserRoleByUserId)
router.get('/get-all-users', userController.getAllUsers)
router.delete('/delete-user/:userId', userController.deleteUser);
router.patch('/update-user/:userId', userController.updateUser);
module.exports = router;