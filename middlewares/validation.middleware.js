const { z } = require('zod');
const { errorResponse } = require('../utils/response.utils');
const statusCodes = require('../utils/statusCodes.utils');

const userSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
})

// middleware for validating the request body 
const validateUser = (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();

    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationErrors = error.errors.map(err => ({
                path: err.path.join('.'),
                message: err.message
            }))
            return errorResponse(
                res, statusCodes.BAD_REQUEST, 'Validation error', 'invalide request payload', validationErrors
            )
        }
        return errorResponse(
            res, statusCodes.INTERNAL_SERVER_ERROR, 'server error', error.message
        )

    }
}
module.exports = { validateUser }