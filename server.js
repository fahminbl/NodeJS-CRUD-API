//dependency declaration
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/productModels')

//express middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//routes
app.get('/', (req, res) => {
    res.send('Hello Node Api');
});

//get all product data
app.get('/products', async (req, res) => {
     try {
        const products = await Product.find({});
        res.status(200).json(products);
     } catch (error) {
       res.status(500).json({message: error.message});
     }
});

//get data with id
app.get('/products/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);       
    } catch (error) {
      res.status(500).json({message: error.message});
    }
});

//create data

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Update data
app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // in case product with specific id cannot be founc
        if (!product) {
            return res.status(404).json({message: `Cannot find any product with id:${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//delete data
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            res.status(404).json({message: `Cannot find and delete any product with id:${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//mongodb option
mongoose.set('strictQuery', false);

//mongodb handler
mongoose.connect('mongodb+srv://fahmi71:NBrmaXGQEiNMNbYb@fahmiapi.prpxxt8.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, ()  => {
        console.log('Node Api app is running on port 3000');
    });
}).catch((err) => {
    console.log(err);
});
