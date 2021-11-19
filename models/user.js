// Mongoose Schema
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male','Female']
    },
    role:{
        type: String,
        required: true,
        enum:['Owner','Customer']
    }
});

// //mongoose model
const User = mongoose.model('User', UserSchema);

module.exports = User