var express = require("./master/express")
var mongoose = require("./master/mongoose")
var passport = require("./master/passport")
var config = require('./other/config')
var app = express()
mongoose()
passport()
var http = require('http')

const server = http.Server(app)

server.listen( config.port, () => {
    console.log(
        `Server is running on port ${config.port}`
    )
} )

