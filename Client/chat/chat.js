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

            const enteredMessage = document.getElementById('message').value
            console.log(enteredMessage)
            const token = localStorage.getItem('token')
            console.log(decodeToken(token))
            let postMessage = await axios.post(`${url}/sendMessage`, { message: enteredMessage }, { headers: { Authorization: token } })

            console.log(postMessage.data.message)
            addMessagetoScreen(postMessage.data.message, "YOU")
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

//setInterval(() => getAllMessages(), 1000)


document.addEventListener('DOMContentLoaded', getAllMessages)