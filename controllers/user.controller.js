const User = require('../models/user.model');
const { errorResponse, successResponse } = require('../utils/response.utils');
const statusCodes = require('../utils/statusCodes.utils');





//creating a user 
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // if (!name || !email || !password) {
        //     return errorResponse(res, 400, 'Validation error', 'All fields are required');
        // }

        const user = await User.create({ name, email, password });
        return successResponse(res, 'user created successfully', user)
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse(res, 400, 'Validation error', 'Email already exists')
        }
        return errorResponse(res, 500, 'Server error', error)
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        //  res.status(200).json(users);
        return successResponse(res, 'request processed successfully', users)
    } catch (error) {
        // res.status(500).json({ message: 'Server error', error: error.message });
        return errorResponse(res, statusCodes.INTERNAL_SERVER_ERROR, 'failed to process request', error)
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            // return res.status(404).json({ message: 'User not found' });
            return errorResponse(res, statusCodes.NOT_FOUND, 'User not found', null)
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
    }
};
// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        // Update user details in the database
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true, runValidators: true } // Return updated user and validate
        );

        if (!updatedUser) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
        }

        res.status(statusCodes.OK).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
    }
};

// Delete a user 
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
        }

        res.status(statusCodes.OK).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
    }
};
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };