const express = require("express");
const { validationMiddleware } = require("../middlewares/index.middleware");
const { userController } = require("../controllers/index.controller");
// const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");
// const { validateUser } = require("../middlewares/validation.middleware");



const router = express.Router();


router.post('/', validationMiddleware.validateUser, userController.createUser)
router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', validationMiddleware.validateUser, userController.updateUser)
router.delete('/:id', userController.deleteUser)


module.exports = router;