const mongoose = require("mongoose");


const cartDataSchema= new mongoose.Schema({
    email:String,
    cartData :[
        {
            name: String,
            description: String,
            price: {
                half: String,
                full: String
            },
            category:String,
            imageUrl: String,
            quantity:Number,
            amount:String,
            total:Number,
            date:{
                type: Date,
            default: Date.now, 
            }
        }
    ],
    
})

module.exports = mongoose.model("cartdata",cartDataSchema)