const express = require('express');
const sequelize = require('./util/db')
const fs = require('fs')
const cors = require('cors');
const User = require('./models/userModel')
const Chats = require('./models/chatModel')
const UserGroup = require('./models/UserGroup')
const chatGroup = require('./models/chatGroup')
const userSignUpRouter = require('./routers/usersignup')
const loginRouter = require('./routers/login')
const chatRouter = require('./routers/chat')
const groupRouter = require('./routers/group')

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
app.use('/group', groupRouter)


User.hasMany(Chats, { onDelete: "CASCADE" })
Chats.belongsTo(User)

UserGroup.belongsTo(User)
User.hasMany(UserGroup)


Chats.belongsTo(chatGroup);
chatGroup.hasMany(Chats)

chatGroup.hasMany(UserGroup)
UserGroup.belongsTo(chatGroup)









const PORT = process.env.PORT || 9000
sequelize.sync({ alter: true }).then((result) => {


    app.listen(PORT);


    console.log("Sequalizeworking and listening to port " + PORT)
})
