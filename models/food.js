const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: {
      half: String,
      full: String
    },
    imageUrl: String,
    category:String
})

module.exports = mongoose.model("food",foodSchema)