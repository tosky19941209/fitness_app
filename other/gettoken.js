const config = require("./config")
const jwt = require("jsonwebtoken")

module.exports = (user) => {
    const jsonData = {
        id: user._id,
        email: user.email,
        username: user.username,
        password: user.password
    }
    return jwt.sign(jsonData, config.secret_key, {
        expiresIn:"1d"
    });
}