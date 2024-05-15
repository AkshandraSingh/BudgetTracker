const mongoose = require('mongoose')

mongoose.connect(process.env.URL)

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected")
})

mongoose.connection.on("error", () => {
    console.log("Mongoose is not connected")
})
