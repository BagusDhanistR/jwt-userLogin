"use strict"
require('dotenv').config()
const express = require("express")
const app = express()
const port = 8080
const userRouter = require("./routes/userRoute")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api", userRouter)

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})