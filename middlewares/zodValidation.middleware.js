const { ZodError } = require('zod');
const { errorResponse } = require('../utils/response.utils');
const statusCodes = require('../utils/statusCodes.utils');

// Middleware for validating Zod schemas
const zodValidation = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const validationErrors = error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }));
                return errorResponse(
                    res,
                    statusCodes.BAD_REQUEST,
                    'Validation error',
                    'Invalid request payload',
                    validationErrors
                );
            }
            return next(error);
        }
    };
};

module.exports = zodValidation;
