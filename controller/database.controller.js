const users = require("../model/users")
const dietLog = require("../model/diet")
const dietMenu = require("../model/dietmenu")
const exerciseLog = require("../model/logs")
const exercisePlan = require("../model/exercise")
const feedbackLog = require("../model/feedback")
const targetKcal = require("../model/targetkcal")

exports.search_email = async (email) => {
    const existEmail = await users.findOne({email:email})
    return existEmail
}

exports.match_password = async (email, password) => {
    const existEmail = await this.search_email(email)
    if(!existEmail) return
    if(password === existEmail.password) return true
    else return false
}

exports.search_id = async (id) => {
    const existID = await users.findById({_id: id})
    return existID
}

