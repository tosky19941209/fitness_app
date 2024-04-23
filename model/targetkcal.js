const mongoose = require('mongoose')

const targetKcal = new mongoose.Schema({
    userid: {
        type: mongoose.mongo.ObjectId,
        required: false
    },
    targetKcal: {
        type: Number,
        required: false
    }
})

const TargetKcalModel = mongoose.model("targetKcal", targetKcal)

module.exports = TargetKcalModel