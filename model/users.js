const mongoose = require('mongoose');

const Userdb = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    membership: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
    loginState:{
        type:Boolean,
        required:false
    }
});

const fitnessuser = mongoose.model('Users', Userdb);
module.exports = fitnessuser;