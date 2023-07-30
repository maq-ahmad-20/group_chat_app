

const Chat = require('../models/chatModel');
const User = require('../models/userModel')

const { Sequelize, Op } = require('sequelize')

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
        const latestId = +req.params.latestId
        console.log(latestId)
        let userMessages = await Chat.findAll({ where: { id: { [Op.gt]: latestId } } })

        console.log(userMessages)

        return res.status(200).json({ messages: userMessages })


    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error" })
    }
}

