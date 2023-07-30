const chaturl = 'http://localhost:8000/group'
const createuserBtn = document.getElementById('createGroup')
console.log(createuserBtn)

async function createGroup() {
    try {
        const groupName = prompt("Group Name");
        const groupMembers = [];
        let userInput;
        while (userInput !== "ok") {
            userInput = prompt(
                `Enter the valid email of users you want  and type ok to create group`
            );
            if (userInput !== "ok") {
                groupMembers.push(userInput);
            }
        }
        console.log(groupName)
        console.log(groupMembers)
        const token = localStorage.getItem("token");
        const res = await axios.post(
            `${chaturl}/createGroup`,
            {
                groupName: groupName,
                groupMembers: groupMembers,
            },
            { headers: { Authorization: token } }
        );
        alert(`${groupName} Created Successfully!`);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }

}






function addGroupToScreen(groupname, owner) {

    let tablegroups = document.getElementById('tableGroups');

    let tr = document.createElement('tr');


    //li.addEventListener('click', getGroupChatScreen())
    let groubBody = `<td class="name" id="${groupname}" onclick=getGroupChatScreen('${groupname}') >${groupname}</td>`
    tr.innerHTML = groubBody;
    tablegroups.appendChild(tr)

}

async function getAllGroups() {

    try {
        let groups = document.getElementById('groups');
        const token = localStorage.getItem("token");
        const groupData = await axios.get(`${chaturl}/getAllGroups`, {
            headers: { Authorization: token },
        });
        groups.innerHTML = "";

        console.log(groupData.data.chatgroups)
        groupData.data.chatgroups.forEach((group) => {
            addGroupToScreen(group.groupname, group.owner)
        })

    } catch (err) {
        console.log(err)
    }

}



createuserBtn.addEventListener('click', createGroup)

document.addEventListener('DOMContentLoaded', getAllGroups)