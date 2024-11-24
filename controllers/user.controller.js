const User = require('../models/user.model');
const { errorResponse, successResponse } = require('../utils/response.utils');
const statusCodes = require('../utils/statusCodes.utils');

//creating a user 
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password });
        return successResponse(res, 'user created successfully', user)
    } catch (error) {
        if (error.code === 11000) {
            return next({
                status: statusCodes.BAD_REQUEST,
                message: 'Validation Error',
                details: 'Email already exists'
            })
        }
        return next(error);
    }
};

// Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return successResponse(res, 'request processed successfully', users)
    } catch (error) {
        return next(error);
    }
};

// Get a single user by ID
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return next({
                status: statusCodes.NOT_FOUND,
                message: 'User not found'
            })
        }
        return successResponse(res, 'request processed successfully', user)
    } catch (error) {
        return next(error)
    }
};
// Update a user by ID
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return next({
                status: statusCodes.NOT_FOUND,
                message: 'User not found'
            })
        }

        return successResponse(res, 'User updated successfully', updatedUser);
    } catch (error) {
        next(error);
    }
};

// Delete a user 
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return next({
                status: statusCodes.NOT_FOUND,
                message: 'User not found'
            })
        }

        return successResponse(res, 'User deleted successfully', { id: deletedUser._id });
    } catch (error) {
        next(error);
    }
};
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };