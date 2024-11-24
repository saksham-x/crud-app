const express = require("express");
const { userController } = require("../controllers/index.controller");
const zodValidation = require("../middlewares/zodValidation.middleware");
const { userSchema } = require("../validations/user.validations");


const router = express.Router();

router.post('/', zodValidation(userSchema), userController.createUser);
router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', zodValidation(userSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser)


module.exports = router;