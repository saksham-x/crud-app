const express = require("express")
const app = express();
const userRoutes = require('./routes/user.routes')

//Middleware
app.use(express.json());



// Routes


app.use('/api/users', userRoutes);



module.exports = app;