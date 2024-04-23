module.exports = () => {
    // const newrelic = require("newrelic")
    const express = require('express')
    const cors = require('cors')
    const morgan = require('morgan')
    const routers = require('./routers')

    const app = express()
    const path = require("path")

    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));

    // app.use(express.static(path.join(__dirname, '../build')))



    routers.map(router => {
        app.use(`/api/${router}`, require(`../routers/${router}`))
    })

    return app

}