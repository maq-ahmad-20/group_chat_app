const url = 'http://localhost:8000';

function validateMessage() {
    const enteredMessage = document.getElementById('message').value
    if (enteredMessage === "") {
        return false
    } else {
        return true
    }
}


document.getElementById('sendMessageButton').addEventListener('click', async (e) => {
    if (validateMessage()) {
        try {
            e.preventDefault()

            console.log(e.target)
            const groupname = JSON.parse(localStorage.getItem('chatMessages'))[0]
            if (!groupname) {
                return alert("Please select group to chat")
            }
            const enteredMessage = document.getElementById('message').value
            console.log(enteredMessage)
            const token = localStorage.getItem('token')
            console.log(decodeToken(token))
            let postMessage = await axios.post(`${url}/sendMessage`, { message: enteredMessage, groupname: groupname.groupname }, { headers: { Authorization: token } })

            console.log(postMessage.data.message)
            addMessagetoChatScreen(postMessage.data.message, "YOU")
            document.getElementById('message').value = ""

        } catch (err) {
            console.log(err)
        }
    }
})


function decodeToken(token) {
    const base64Url = token.split(".")[1];
    console.log(base64Url)

    const jsonObj = decodeURIComponent(
        atob(base64Url)

    );
    console.log(jsonObj)
    return JSON.parse(jsonObj);
}

function addMessagetoChatScreen(data, sender) {

    let headingAvtar = `  <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
</a>
<div class="chat-about">
    <h6 class="m-b-0">${data.username}</h6>

</div>`

    document.getElementById('headingAvtar').innerHTML = headingAvtar


    let messagesUl = document.getElementById('chatBoxMessages')
    //console.log(messagesUl)
    let li = document.createElement('li');
    li.className = "clearfix"

    let messagehtml = ` 
    <div class="message-data text-right">
    <span style="display: inline;font-size: small;">${sender}</span>
    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" /></div>
    <div class="message other-message float-right">
       ${data.usermessage}
    </div>
   `
    // console.log(li)
    li.innerHTML = messagehtml;
    messagesUl.appendChild(li)
}

function addMessageToChatScreenLeft(data, sender) {


    let messagesUl = document.getElementById('chatBoxMessages')
    let li = document.createElement('li');
    li.className = "clearfix"

    let messagehtml = ` 
    <div class="message-data text-left">
   
    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="avatar" />
    <span style="display: inline;font-size: small;">${sender}</span>
    </div>
    <div class="message other-message float-left">
       ${data.usermessage}
    </div>
   `
    // console.log(li)
    li.innerHTML = messagehtml;
    messagesUl.appendChild(li)

}


//gettingmessagesfromdatabase
async function getAllMessages() {
    try {

        const totalMessages = await axios.get(`${url}/getAllMessages`);
        const token = localStorage.getItem("token");
        const decodedToken = decodeToken(token);
        const userid = decodedToken.userid;
        document.getElementById('chatBoxMessages').innerHTML = ""

        console.log(totalMessages.data.messages)

        totalMessages.data.messages.forEach((message) => {
            // console.log(message.userId)
            //console.log(userid)
            if (message.userId === userid) {

                addMessagetoChatScreen(message, "YOU")

            } else {

                addMessageToChatScreenLeft(message, message.username)

            }
        })


    } catch (err) {
        console.log(err)
    }


}

async function storeMessagesInLocalStorage() {

    try {
        let previousLatestMessage;
        const groupname = JSON.parse(localStorage.getItem('chatMessages'))[0]
        console.log(groupname)
        if (!groupname) {
            return alert("Please select group to chat")
        }

        let chatMessages = JSON.parse(localStorage.getItem('chatMessages'))

        if (chatMessages.length > 1) {
            let chatArr = JSON.parse(localStorage.getItem('chatMessages'))
            let length = chatArr.length;
            previousLatestMessage = chatArr[length - 1].id // getting previous latest messgae so we can call from db > this id 
            console.log(previousLatestMessage)
        } else {
            previousLatestMessage = 0;
        }

        const totalMessages = await axios.get(`${url}/getAllMessages/${previousLatestMessage}/${groupname.groupname}`);
        const token = localStorage.getItem("token");
        const decodedToken = decodeToken(token);
        const userid = decodedToken.userid;
        document.getElementById('chatBoxMessages').innerHTML = ""


        // keeping the new fetched data again in local storage
        const previousChats = JSON.parse(localStorage.getItem('chatMessages'));

        if (!previousChats) {
            localStorage.setItem('chatMessages', JSON.stringify(totalMessages.data.messages))

        } else { // if  messages present in LS so  push all new messages to array and store agin in LS for next messages
            totalMessages.data.messages.forEach((message) => {
                previousChats.push(message)
            })
            localStorage.setItem('chatMessages', JSON.stringify(previousChats))


            previousChats.forEach((message) => {
                // console.log(message.userId)
                //console.log(userid)
                if (message.userId === userid) {

                    addMessagetoChatScreen(message, "YOU")

                } else {

                    addMessageToChatScreenLeft(message, message.username)

                }
            })
        }



    } catch (err) {
        console.log(err)
    }
}



//setInterval(() => getAllMessages(), 1000)

// getiing chats
async function getGroupChatScreen(groupname) {
    //e.preventDefault()
    try {
        console.log(groupname)
        let previousLatestMessage;
        let chatMessages = []
        chatMessages.push({ groupname: groupname })
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages))

        if (chatMessages.length > 1) {
            let chatArr = JSON.parse(localStorage.getItem('chatMessages'))
            let length = chatArr.length;
            previousLatestMessage = chatArr[length - 1].id // getting previous latest messgae so we can call from db > this id 
            console.log(previousLatestMessage)
        } else {
            previousLatestMessage = 0;
        }
        const totalMessages = await axios.get(`${url}/getAllMessages/${previousLatestMessage}/${groupname}`);


        const previousChats = JSON.parse(localStorage.getItem('chatMessages'));

        if (!previousChats) {
            localStorage.setItem('chatMessages', JSON.stringify(totalMessages.data.messages))

        } else { // if  messages present in LS so  push all new messages to array and store agin in LS for next messages
            totalMessages.data.messages.forEach((message) => {
                previousChats.push(message)
            })
            localStorage.setItem('chatMessages', JSON.stringify(previousChats))

            previousChats.forEach((message) => {
                // console.log(message.userId)
                //console.log(userid)
                if (message.userId === userid) {

                    addMessagetoChatScreen(message, "YOU")

                } else {

                    addMessageToChatScreenLeft(message, message.username)

                }
            })


        }

        console.log(document.getElementById(groupname))
    } catch (err) {
        console.log(err)
    }

}


document.addEventListener('DOMContentLoaded', storeMessagesInLocalStorage)