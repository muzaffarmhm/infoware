// Mongoose Schema
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/infoware');

//Mongoose Error handling
mongoose.connection.on('error', function(err) {
    console.log('Mongoose Error: ', err);
    });

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
});

// //mongoose model
const Order = mongoose.model('Order', OrderSchema);



//seed data
const data = [
    {
        "name": 'Coca Cola',
        "quantity": 10,
        "price": 10
    },
    {
        "name": 'Pepsi',
        "quantity": 10,
        "price": 10
    },
    {
        "name": 'Fanta',
        "quantity": 10,
        "price": 10
    },
]

const seedDB = async () => {
    try {
        await Order.deleteMany({})
        console.log('removed data')
        await Order.insertMany(data)
        console.log('seeded data')
    } catch (err) {
        console.log(err)
    }
}

   


// seedDB();
module.exports = Order;