const express = require('express');
const sequelize = require('./util/db')
const fs = require('fs')
const cors = require('cors');


require('dotenv').config()
const app = express();


app.use(cors())

app.use(express.json())


const PORT = process.env.PORT || 9000
sequelize.sync({ force: true }).then((result) => {

    app.listen(PORT);


    console.log("Sequalizeworking")
})
