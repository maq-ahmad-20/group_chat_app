const express = require('express');
const sequelize = require('./util/db')
const fs = require('fs')
const cors = require('cors');
const UserModel = require('./models/userModel')
const userSignUpRouter = require('./routers/usersignup')

require('dotenv').config()

const app = express();


app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"]
}))



app.use(express.json())

app.use('/user', userSignUpRouter)

const PORT = process.env.PORT || 9000
sequelize.sync({ alter: true }).then((result) => {


    app.listen(PORT);


    console.log("Sequalizeworking and listening to port " + PORT)
})
