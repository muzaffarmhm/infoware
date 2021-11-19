const mongoose = require('mongoose');
const data = require('./seedData');
const User = require('../../models/user');

mongoose.connect('mongodb://localhost/infoware');

//Mongoose Error handling
mongoose.connection.on('error', function(err) {
    console.log('Mongoose Error: ', err);
    });



const seedDB = async () => {
    try {
        await User.deleteMany({})
        console.log('removed data')
        await User.insertMany(data)
        console.log('seeded data')
    } catch (err) {
        console.log(err)
    }
}

console.log(data)
seedDB();

