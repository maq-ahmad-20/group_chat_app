const url = 'http://localhost:8000';



document.getElementById('sendMessageButton').addEventListener('click', async (e) => {
    try {
        e.preventDefault()

        console.log(e.target)

        const enteredMessage = document.getElementById('message').value
        console.log(enteredMessage)
        const token = localStorage.getItem('token')
        let postMessage = await axios.post(`${url}/sendMessage`, { message: enteredMessage }, { headers: { Authorization: token } })

        console.log(postMessage)

    } catch (err) {
        console.log(err)
    }
})