const express = require('express')
const mongoose = require('mongoose')
const bodyParser=require('body-parser')

require('dotenv').config()
const routerService = require('./Router/routerService')
const routerJob = require('./Router/routerJob')
const routerLogin = require('./Router/routerLogin')
const routerUser= require('./Router/routerUser')
const routerCustomer=require('./Router/routerCustomer')
const routerAssign=require('./Router/routerAssign')
const routerBill = require('./Router/routerBill')

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json());

app.use(express.json())
app.use('/Service',routerService)
app.use('/Job',routerJob)
app.use('/Login',routerLogin)
app.use('/User',routerUser)
app.use('/Customer', routerCustomer)
app.use('/Assign', routerAssign)
app.use('/Bill',routerBill)
app.listen(port,()=>{       
    console.log(`Server running on the port ${port}`)
})




