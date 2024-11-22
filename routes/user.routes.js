const express = require("express");
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");


const router = express.Router();

// Route to create user

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router;