const mongoose = require("mongoose")

const emailPasscode = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    passcode: {
        type: String,
        required: false
    },
    password:{
        type:String,
        required: false
    }
})

const passcodeModel = mongoose.model("passcodemodel", emailPasscode)

module.exports = passcodeModel