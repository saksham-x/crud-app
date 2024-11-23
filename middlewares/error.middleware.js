const { errorResponse } = require("../utils/response.utils")
const statusCodes = require("../utils/statusCodes.utils")

const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.message || err)

    if (err.status && err.message) {
        return errorResponse(res, err.status, err.message, err.details || null)

    }
    return errorResponse(
        res,
        statusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong',
        err.message || null
    )
}

module.exports = errorMiddleware