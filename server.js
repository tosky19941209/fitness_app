var express = require("./master/express")
var mongoose = require("./master/mongoose")
var passport = require("./master/passport")
var config = require('./other/config')
var app = express()
mongoose()
passport()

app.listen(config.port, () => {
    console.log(`http server is running on ${config.port}`)
})


