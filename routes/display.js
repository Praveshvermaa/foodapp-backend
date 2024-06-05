const express = require("express")
const foodModel = require("../models/food")
const route = express.Router()
const foodcategorymodel = require("../models/foodcategory")
const cartModel = require("../models/Cartdata")
const checkoutModel = require("../models/checkout")
route.get("/food", async (req, res) => {
    const food = await foodModel.create({
        name: "Bacon Cheese Burger",
        description: "Classic cheeseburger topped with crispy bacon slices.",
        price: {
            half: 6.99,
            full: 11.49
        },
        category: "Burger",

        imageUrl: "https://leitesculinaria.com/wp-content/uploads/2022/07/skillet-bacon-cheeseburger-with-crispy-fried-onions.jpg"
    })
    await food.save()
    res.send(food)
})
route.get("/foodcategoryitem", async (req, res) => {
    const food = await foodcategorymodel.create({
        category: "Chowmein",
    })
    await food.save()
    res.send(food)
})
route.get("/findfooditem", async (req, res) => {
    const food = await foodModel.find()

    res.json(food)
})
route.get("/findfoodcategoryitem", async (req, res) => {
    const food = await foodcategorymodel.find()

    res.json(food)
})
route.post("/checkout", async (req, res) => {
    try {
        const data = await checkoutModel.findOne({ email: req.body.email })
        if (data) {
            const cartdata = req.body.cartData;

            data.cartData.push(cartdata)
            await data.save()

        }
        else {
            await checkoutModel.create({
                email: req.body.email,
                cartData: req.body.cartData
            })
        }
        res.json({ success: true })

    } catch (error) {
        res.send(error)
        res.json({ success: false })

    }
})
route.post("/cartdata", async (req, res) => {
    try {
        const data = await cartModel.findOne({ email: req.body.email })
        if (data) {
            const cartdata = req.body.cartData;

            data.cartData.push(cartdata)
            await data.save()

        }
        else {
            await cartModel.create({
                email: req.body.email,
                cartData: req.body.cartData
            })
        }
        res.json({ success: true })

    } catch (error) {
        res.send(error)
        res.json({ success: false })

    }
})
route.post("/cartnav", async (req, res) => {
    try {
        const cartdata = await cartModel.findOne({ email: req.body.email })
        res.json({data:cartdata.cartData,success:true})

    } catch (error) {
        res.send(error)
        

    }
})
route.post("/removecart",async(req,res)=>{
    const data = await cartModel.findOne({email:req.body.email})


    let success = false;
    if(data){
        data.cartData = data.cartData.filter((item)=>(item._id!=req.body.id))
    success=true
    }
    await data.save()
   
    res.json({success})
})
route.post("/removecartcheckout",async(req,res)=>{
    const data = await checkoutModel.findOne({email:req.body.email})


    let success = false;
    if(data){
        data.cartData = data.cartData.filter((item)=>(item._id!==req.body.id))
    success=true
    }
    await data.save()
    res.json({success})
})
route.post("/checkoutadd",async(req,res)=>{
    const data = await cartModel.findOneAndDelete({email:req.body.email})
  
  if (data) {
    res.json({success:true})
  } 
})
route.post("/findcheckout",async (req,res)=>{
    try {
        const checkout = await checkoutModel.findOne({email:req.body.email})
        res.json({data:checkout.cartData,success:true})
    } catch (error) {
        res.send(error)
    }
})



module.exports = route