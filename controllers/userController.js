const User = require('../models/userModel');


//creating a user 
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Save the user to the database
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        // Handle duplicate email error or other database errors
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createUser };