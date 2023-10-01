const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productmodels');
const app = express();
app.use(express.json());

// routes
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
// for finding a single product from databases we use this id 
app.get('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const products = await Product.findById({id});
        res.status(200).json(products);

    }
    catch(error){
        res.status(500).json({ message: error.message })

    }
})

// update a product 
// app.put('/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);

//         if (!product) {
//             return res.status(404).json({ message: `Cannot find product with id: ${id}` });
//         }

//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
app.put('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Run model validation
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: `Cannot find product with id: ${id}` });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
//   delete command
app.delete('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Run model validation
      });
  
      if (!deletedProduct) {
        return res.status(404).json({ message: `Cannot find product with id: ${id}` });
      }
  
      res.status(200).json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

 
app.get('/', (req, res) => {
    res.send('hello node api');
});

app.get('/blog', (req, res) => {
    res.send('hello blog');
});

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://Admin:Shivam123@cluster0.bxgabdy.mongodb.net/Node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to mongodb');
        app.listen(3000, () => {
            console.log('Node API is running on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    });
