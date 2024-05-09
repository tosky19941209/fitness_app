var express = require("./master/express")
var mongoose = require("./master/mongoose")
var passport = require("./master/passport")
var config = require('./other/config')
var app = express()
mongoose()
passport()
// var http = require('https')

// const server = http.Server(app)

// server.listen( config.port, () => {
//     console.log(
//         `Server is running on port ${config.port}`
//     )
// } )

var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
    key: fs.readFileSync('cert/traeningsbuddy-dk-privateKey.key'),
    cert: fs.readFileSync('cert/traeningsbuddy-dk.crt')
};

// Create an HTTP service.
http.createServer(app).listen(config.port, () => {
    console.log(`http server is running on ${config.port}`)
})


// https.createServer(options, app).listen(443, () => {
//     console.log("https Server is running on port 443")
// });