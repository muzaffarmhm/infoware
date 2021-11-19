const mongoose = require('mongoose');
const data = require('./seedData');
const Owner = require('../../models/owner');

mongoose.connect('mongodb://localhost/infoware');

//Mongoose Error handling
mongoose.connection.on('error', function(err) {
    console.log('Mongoose Error: ', err);
    });



const seedDB = async () => {
    try {
        await Owner.deleteMany({})
        console.log('removed data')
        await Owner.insertMany(data)
        console.log('seeded data')
    } catch (err) {
        console.log(err)
    }
}

console.log(data)
seedDB();

