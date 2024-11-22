const successResponse = (res, message, data) => {
    res.status(200).json({
        success: true,
        message: message || 'Request processed successfully',
        data: data || null,
    });
};
const errorResponse = (res, statusCode, message, error = null, validationErrors = null) => {
    res.status(statusCode).json({
        success: false,
        message: message || 'Error processing request',
        error,
        validationErrors,
    });
};
module.exports = { successResponse, errorResponse }