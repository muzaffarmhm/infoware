const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/user');
const Product = require('./models/products');
const Order = require('./models/orders');
const { applyEach } = require('async');

mongoose.connect('mongodb://localhost/infoware');

//Mongoose Error handling
mongoose.connection.on('error', function(err) {
    console.log('Mongoose Error: ', err);
    });


//Middleware
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//endpoints
app.listen(3000, function() {
    console.log('Listening on port 3000');
});

//Add Account

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/',async(req,res)=>{
    const account = req.body;
    const newAccount = new User(account);
    await newAccount.save();
    res.redirect('/');
})

//Add products

app.get('/products',(req,res)=>{
    res.render('products');
})

app.post('/products',(req,res)=>{
    const product = req.body;
    const newProduct = new Product(product);
    newProduct.save();
    res.redirect('/products');
})

//Browse products

app.get('/products/show',async(req,res)=>{
    const products = await Product.find({});
    res.render('show',{products});
    })

//Order products
app.get('/order/:id',(req,res)=>{
    const {id} = req.params;
    Product.findById(id,(err,product)=>{
        if(err) return console.log(err);
        res.render('order',{product});
    })
})

app.post('/order/:id',async(req,res)=>{
    const {id} = req.params;
    const {quantity} = req.body;

    console.log(quantity);
    const c = await Product.findById(id).exec();
    console.log(c);

    const order = new Order({
        name: c.name,
        quantity: quantity,
        price: c.price
    });
    await order.save();
    res.redirect('/products/show');
})

//View orders

app.get('/orders',async(req,res)=>{
    const orders = await Order.find({});
    res.render('orderlist',{orders});
})

