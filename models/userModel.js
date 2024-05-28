const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPhone: {
        type: Number,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userPreviousPasswords: {
        type: Array,
        default: []
    },
    userProfilePic: {
        type: String,
        default: "uploads/userProfilePics/defaultProfilePic.jpg"
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

userSchema.set("timestamps", true)

module.exports = mongoose.model('user', userSchema)
