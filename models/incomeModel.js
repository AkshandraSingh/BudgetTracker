const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    incomeAmount: {
        type: Number,
        required: true
    },
    incomeSource: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

incomeSchema.set("timestamps", true)

module.exports = mongoose.model('income', incomeSchema)
