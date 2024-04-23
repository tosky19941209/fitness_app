module.exports = () => {
    const mongoose = require("mongoose")
    const config = require("../other/config")

    mongoose.connect(config.mongodb)
    .then(result => {
        console.log("mongoose is connected.")
    })
    .catch(err => {
        console.log(err)
    })
}