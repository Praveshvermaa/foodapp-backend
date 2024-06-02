const mongoose = require("mongoose")




const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String
    }
    ,address:String
})

module.exports = mongoose.model("user",userSchema)