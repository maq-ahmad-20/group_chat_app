const express = require('express');
const sequelize = require('./util/db')
const fs = require('fs')
const cors = require('cors');
const User = require('./models/userModel')
const Chats = require('./models/chatModel')
const userSignUpRouter = require('./routers/usersignup')
const loginRouter = require('./routers/login')
const chatRouter = require('./routers/chat')

require('dotenv').config()

const app = express();


// app.use(cors({
//     origin: process.env.ORIGIN,
//     methods: ["GET", "POST"]
// }))

app.use(cors())


app.use(express.json())

app.use('/user', userSignUpRouter)
app.use(loginRouter)
app.use(chatRouter)


User.hasMany(Chats, { onDelete: "CASCADE" })
Chats.belongsTo(User)


const PORT = process.env.PORT || 9000
sequelize.sync({ alter: true }).then((result) => {


    app.listen(PORT);


    console.log("Sequalizeworking and listening to port " + PORT)
})
