const mongoose = require("mongoose")

const feedback = new mongoose.Schema({
    userid: {
        type: mongoose.mongo.ObjectId,
        required: false
    },
    year:{
        type: Number,
        required: false,
    },
    month: {
        type: Number,
        required: false
    },
    date:{
        type: Number,
        required: false
    },
    hour:{
        type: Number,
        required: false
    },
    minute: {
        type: Number,
        required: false
    },
    feedback: {
        type: String,
        required: false
    }
})

const FeedBacks = mongoose.model("feedback", feedback)

module.exports = FeedBacks