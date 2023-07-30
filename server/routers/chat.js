const express = require('express');
const chatControl = require("../controllers/chat")
const UserAuthentication = require("../UserAuthentication/auth")

const router = express.Router();

//router.get('/getAllMessages', chatControl.getAllMessages)

router.get('/getAllMessages/:latestId', chatControl.getAllMessages)

router.post('/sendMessage', UserAuthentication.authentiateUser, chatControl.postUserMessageToDB)




module.exports = router;