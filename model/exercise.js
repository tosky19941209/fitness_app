const mongoose = require('mongoose')

const Exercise = new mongoose.Schema({
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
    exerciseType:{
        exerciseName:{
            type: [String],
            required: false
        },
        exerciseTime:{
            type: [String],
            required: false
        }

       
    }
})

const exercisemodel = mongoose.model("exerciseType", Exercise)

module.exports = exercisemodel