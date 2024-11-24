const { z } = require('zod')

const userSchema = z.object({
    name: z.string().min(3, { message: "Name must be 3 characterlong" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
})

module.exports = { userSchema }