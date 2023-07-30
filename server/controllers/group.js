
const User = require("../models/userModel");
const chatGroups = require("../models/chatGroup");
const UserGroup = require("../models/UserGroup");
const { Op } = require("sequelize");





exports.createGroup = async (req, res, next) => {

    try {
        const groupName = req.body.groupName;
        const owner = req.user.username;
        const groupMembers = req.body.groupMembers;

        const chatGroup = await chatGroups.create({ groupname: groupName, owner: owner });

        const invitedMembersToGroup = await User.findAll({
            where: {
                useremail: {
                    [Op.or]: groupMembers,
                }
            }
        });

        const allMembersAdded = [];
        invitedMembersToGroup.map(async (user) => {
            console.log(user)

            let addedUser = await UserGroup.create({
                groupname: groupName,
                isadmin: false,
                userId: user.dataValues.id,
                chatgroupId: chatGroup.dataValues.id

            })
            allMembersAdded.push(addedUser)

        })

        await Promise.all(allMembersAdded)


        // owmer whocreated group

        await UserGroup.create({
            groupname: groupName,
            isadmin: true,
            userId: req.user.id,
            chatgroupId: chatGroup.dataValues.id

        })

        return res.status(200).json({ groupName: groupName, groupMembers: groupMembers })


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}


exports.getGroups = async (req, res, next) => {

    try {
        const chatgroups = await chatGroups.findAll({
            attributes: ["groupname", "owner"],
            include: [
                {
                    model: UserGroup,
                    where: { userId: req.user.id },
                },
            ],
        });
        res.status(200).json({ chatgroups: chatgroups });


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}