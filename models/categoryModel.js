const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryDescription: {
        type: String,
        default: "Not Given",
    },
    categoryLimit: {
        type: Number,
        required: true,
    },
    categoryBalance: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
})

categorySchema.set("timestamps", true)

module.exports = mongoose.model('category', categorySchema)
