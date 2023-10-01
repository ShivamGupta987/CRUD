const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'please required a product name']
        },
        quantity:{
            type:Number,
            required:[true,'please required a Number']
        },
        price:{
            type:Number,
            required:[true,'please required a Number']
        },
        iamge:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true
    }
)
const product = mongoose.model('Product',productSchema)
module.exports=product;