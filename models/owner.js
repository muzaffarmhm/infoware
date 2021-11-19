// Mongoose Schema
const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
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
});

// //mongoose model
const Owner = mongoose.model('Owner', OwnerSchema);

module.exports = Owner