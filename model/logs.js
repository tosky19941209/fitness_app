const mongoose = require('mongoose')

const logdb = new mongoose.Schema({
    userid: {
        type: mongoose.mongo.ObjectId,
        required: false
    },
    year: {
        type: String,
        required: false
    },
    month: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    day: {
        type: String,
        required: false
    },
    hour: {
        type: String,
        required: false
    },
    minute: {
        type: String,
        required: false
    },
    index: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    exercise:{
        type: String,
        required: false
    },
    counter: {
        type: String,
        required: false
    },
    accuracy: {
        type: String,
        required: false
    },
    durtime: {
        type: String,
        required: false
    }
})

const fitnessexercise = mongoose.model('logexercise', logdb)
module.exports = fitnessexercise