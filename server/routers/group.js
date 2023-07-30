const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group");
const Authentication = require("../UserAuthentication/auth");

router.get("/getAllGroups", Authentication.authentiateUser, groupController.getGroups);

router.post("/createGroup", Authentication.authentiateUser, groupController.createGroup);


module.exports = router;