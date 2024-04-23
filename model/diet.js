const mongoose = require('mongoose')

const Diet = new mongoose.Schema({
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
    meal: {
        breakfast: {
            type: [String],
            required: false
        },
        snack1: {
            type: [String],
            required: false
        },
        lunch: {
            type: [String],
            required: false
        },
        snack2: {
            type: [String],
            required: false
        },
        dinner: {
            type: [String],
            required: false
        },
    },
    amount: {
        breakfast: {
            type: [Number],
            required: false
        },
        snack1: {
            type: [Number],
            required: false
        },
        lunch: {
            type: [Number],
            required: false
        },
        snack2: {
            type: [Number],
            required: false
        },
        dinner: {
            type: [Number],
            required: false
        },
    }
})

const dietmodel = mongoose.model("diet", Diet)

module.exports = dietmodel