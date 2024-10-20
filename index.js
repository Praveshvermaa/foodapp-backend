const express = require('express')
const dotenv = require("dotenv")
const app = express()
const bodyParser = require("body-parser")
const userSchema = require("./models/user")
const cors = require("cors")
const bycryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const route = require("./routes/display")
const { default: mongoose } = require('mongoose')
const cron = require('node-cron');
const axios = require('axios');
dotenv.config({path:"./.env"})
require("./DB")
const port = process.env.PORT 





app.use(cors());
app.use(bodyParser.json());
app.use("/api",route)
app.get("/",(req,res)=>{
    res.send("hello world")
})


app.post('/register',async function (req, res) {
  const salt = await bycryptjs.genSalt(10)
  const secPasword = await bycryptjs.hash(req.body.password,salt)
  const user = new userSchema({
    username:req.body.username,
    email:req.body.email,
    password:secPasword,
    address:req.body.address,
  })
  await user.save()
  if (user) {
   return  res.status(200).json({user,success:true})
  }
  return  res.json({success:false})

})


app.post("/login",async (req,res)=>{
    const email = req.body.email;
    const user = await userSchema.findOne({email})
    if(!user){ 
      
      return 
    }
    const token =  jwt.sign({id:user._id},"secret1234567890")
    
    

    
  const cmppassword =  await bycryptjs.compare(req.body.password,user.password)
  
    if (user&&cmppassword) {

      return  res.status(200).json({user:token,success:true}) 
      
    }
    return  res.json({success:false})
    
})
cron.schedule('*/5 * * * *', () => {
  axios.get(`https://foodapp-backend-l0u0.onrender.com`)
    .then(() => console.log('Pinged self to keep warm'))
    .catch(err => console.error('Error pinging self', err));
});

app.listen(port ,(req,res)=>{
    console.log("server is running on 3000");
})