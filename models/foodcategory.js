const mongoose = require("mongoose")

const FoodcategorySchema = new mongoose.Schema({
    category:String
})

module.exports = mongoose.model("foodcategory",FoodcategorySchema)