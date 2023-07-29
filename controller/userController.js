'use strict'
const {comparePass} = require("../helper/hashPass")
const { generateToken, verifyToken } = require("../helper/jwt")
const {User} = require("../models")

module.exports.registerUser = async function (req, res) {
    try {
        //take data nama, email, password from body
        const {nama, email, password} = req.body
        //create User to database
        const user =  await User.create({nama, email, password})
        //create new data for return the result, exclude the password
        const result = {name: user.nama, id: user.id, email: user.email} 
        //return data creation
        return res.status(201).json({message: "user berhasil dibuat", data: result})
    } catch (error) {
        //show error from sequelize
        if (error.name == "SequelizeValidationError") {
            return res.status(500).json({message: error.errors.map(el => el.message)})
        }
        //show other error 
        return res.status(500).json({message: error.message})
    }
}

module.exports.loginUser = async function (req, res) {
    try {
        //take data email and password from body
        const {email, password} = req.body
        //finding user by using email user
        const user = await User.findOne({where: {email: email}})
        if(user) {
            //if user exist then we validate the password using helper comparePass
            const validatePass = comparePass(password, user.password)
            if(validatePass) {
                //if pass validate the we generate token using helper generateToken
                const access_token = generateToken({
                    id: user.id
                })
                //return access token
                return res.status(200).json({message: "user berhasil login", access_token})
            }
            //return error if password validation failed
            return res.status(400).json({message: "Password yang anda masukkan tidak sesuai"})
        }
        //return error if user not found
        return res.status(404).json({message: "User tidak ditemukan"})
    } catch (error) {
        //return error if there are internal server error
        return res.status(500).json({message: error.message})
    }
}

module.exports.userDetail = async function(req, res) {
    try {
        //take access token from header
        const {access_token} =  req.headers
        //return error if access token not found
        if(!access_token) return res.status(400).json({message: "access token tidak ditemukan"})
        //verify access token use helper verifyToken
        const userToken = verifyToken(access_token)
        //find user from primary key use verify token id
        const user = await User.findByPk(userToken.id)
        if(user) {
            //if user found, create new variable for result and return 
            const result = {
                id: user.id,
                nama: user.nama,
                email: user.email
            }
            return res.status(200).json({message: "user ditemukan", data: result})
        } 
        //return error if User not found
        return res.status(404).json({message: "User tidak ditemukan"})
    } catch (error) {
        //return error if there are internal server error
        return res.status(500).json({message: error.message})
    }
}