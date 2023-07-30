

const Chat = require('../models/chatModel');
const User = require('../models/userModel')

exports.postUserMessageToDB = async (req, res, next) => {

    try {

        console.log(req.user)
        console.log(req.body)
        //const userId = req.user.id

        let postedMessage = await Chat.create({
            username: req.user.username,
            usermessage: req.body.message,
            userId: req.user.id // foreignkey
        })

        return res.status(200).json({ message: postedMessage })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error" })
    }
}

exports.getAllMessages = async (req, res, next) => {

    try {
        let userMessages = await Chat.findAll()

        return res.status(200).json({ messages: userMessages })


    } catch (err) {
        return res.status(500).json({ message: "error" })
    }
}