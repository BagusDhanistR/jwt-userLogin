'use strict'
const jwt = require("jsonwebtoken")
const PRIVATE_KEY = process.env.PRIVATE_KEY

function generateToken(payload) {
    //generate token
    return jwt.sign(payload, PRIVATE_KEY)
}

function verifyToken(token) {
    //verify token
    return jwt.verify(token, PRIVATE_KEY)
}

module.exports = {
    generateToken, verifyToken
}