const mongoose = require('mongoose')

const dietMenu = new mongoose.Schema({
    foodName:{
        type: String,
        required: false
    },
    kcal:{
        type:Number,
        required: false
    },
    protein: {
        type: Number,
        required: false,
    },
    water: {
        type: Number,
        reqruied: false
    },
    mineral: {
        type: Number,
        required: false
    }
})

const NewDietMenu = mongoose.model('dietmenu', dietMenu)

module.exports = NewDietMenu