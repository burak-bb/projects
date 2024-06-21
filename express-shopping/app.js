const express = require('express')
const app = express()
const itemesRoute = require('./routes/items')

app.use(express.json())

app.use('/items', itemesRoute)



module.exports = app