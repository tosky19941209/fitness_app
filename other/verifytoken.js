const jwt = require("jsonwebtoken")
const config = require("./config")

module.exports = (token) => {
    var result = null
    jwt.verify(token, config.secret_key, async(err, payload) => {
        result = payload 
    })
    return result
}