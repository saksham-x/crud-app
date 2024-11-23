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
            // return errorResponse(res, statusCodes.BAD_REQUEST, 'Validation error', 'Email already exists')
            return next({
                status: statusCodes.BAD_REQUEST,
                message: 'Validation Error',
                details: 'Email already exists'
            })
        }
        // return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, 'failed to process request', error)
        return next(error);
    }
};

// Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        //  res.status(200).json(users);
        return successResponse(res, 'request processed successfully', users)
    } catch (error) {
        // res.status(500).json({ message: 'Server error', error: error.message });
        // return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, 'failed to process request', error)
        return next(error);
    }
};

// Get a single user by ID
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            // return errorResponse(res, statusCodes.NOT_FOUND, 'User not found', null)
            return next({
                status: statusCodes.NOT_FOUND,
                message: 'User not found'
            })
        }
        return successResponse(res, 'request processed successfully', user)
    } catch (error) {
        // return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, 'Server error', error.message);
        return next(error)
    }
};
// Update a user by ID
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        // Update user details in the database
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            // return errorResponse(res, statusCodes.NOT_FOUND, 'User not found', null);
            return next({
                status: statusCodes.NOT_FOUND,
                message: 'User not found'
            })
        }

        return successResponse(res, 'User updated successfully', updatedUser);
    } catch (error) {
        // return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, 'Server error', 'An unexpected error occurred');
        next(error);
    }
};

// Delete a user 
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            // return errorResponse(res, statusCodes.NOT_FOUND, 'User not found', null);
            return next({
                status: statusCodes.NOT_FOUND,
                message: 'User not found'
            })
        }

        return successResponse(res, 'User deleted successfully', { id: deletedUser._id });
    } catch (error) {
        // return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, 'Server error', 'An unexpected error occurred');
        next(error);
    }
};
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };