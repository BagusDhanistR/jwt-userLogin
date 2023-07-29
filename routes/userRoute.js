'use strict'
const route = require("express").Router()
const userController = require("../controller/userController")

route.post("/register", userController.registerUser)
route.post("/login", userController.loginUser)
route.get("/me", userController.userDetail)

module.exports = route
