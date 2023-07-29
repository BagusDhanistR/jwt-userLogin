'use strict'
const bcrypt = require("bcryptjs")

function hashedPass(userPassword) {
    //hash password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userPassword, salt)
    return hash
}

function comparePass(inputPass, hashedPass) {
    //compare input password from hashed password
    return bcrypt.compareSync(inputPass, hashedPass)
}

module.exports = {
    hashedPass, comparePass
}