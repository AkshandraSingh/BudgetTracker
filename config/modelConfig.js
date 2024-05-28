const mongoose = require('mongoose')

const mainLogger = require('../utils/mainLogger')

mongoose.connect(process.env.URL)

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected")
    mainLogger.info("Mongoose is connected")
})

mongoose.connection.on("error", () => {
    console.log("Mongoose is not connected")
    console.log(`Error: ${error}`)
    mainLogger.error("Mongoose is not connected")
    mainLogger.error(`Error: ${error}`)
})
