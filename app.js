const express = require("express")
const userRoutes = require('./routes/user.routes');
const errorMiddleware = require("./middlewares/error.middleware");


const app = express();
//Middleware
app.use(express.json());

//Base rooute
app.use('/api/users', userRoutes);

// Error handelling middleware 
app.use(errorMiddleware)


module.exports = app;