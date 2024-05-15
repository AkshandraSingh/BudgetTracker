const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true
    },
    expenseDescription: {
        type: String,
        default: "Not Given"
    },
    expenseAmount: {
        type: Number,
        required: true
    },
    expenseCategory: {
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

expenseSchema.set("timestamps", true)

module.exports = mongoose.model('expense', expenseSchema)
