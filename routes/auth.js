const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Usertype = mongoose.model("Usertype");
const bcrypt=require("bcrypt");
const cors = require("cors")
const jwt=require("jsonwebtoken");
const Jwt_secret=require("../keys");
const requirelogin = require("../middlewares/requirelogin");

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/instaData");
mongoose.connection.on("connected", () => {
    console.log("connected to mongoDb succesfully")
})
router.use(cors());




router.post("/signup", (req, res) => {
    const {name,email,userName,password} =req.body;

    if (!name || !email || !userName || !password) {
       return res.json({ error: "Please Add All The Fields" })
    }
    Usertype.findOne({ $or: [{email: email },{userName:userName}]}).then((savedUser) => {
        if (savedUser) {
            return res.json({ error: "User already exist with that email or userName" })
        }
        bcrypt.hash(password,12).then((hashedPassword)=>{
            const user = new Usertype({
                name,
                email,
                userName,
                password:hashedPassword
            })
    
            user.save().then(() => {
                res.json({ message: "Registered successfully"})
            });
        })
        
    })



})

router.post("/signin",(req,res)=>{
const {email,password}=req.body;
if(!email||!password){
    return res.json({error:"please add email and the password"})
}
Usertype.findOne({email:email}).then((savedUser)=>{
  if(!savedUser){
    return res.json({error:"Invalid email"});
  }
   bcrypt.compare(password,savedUser.password).then((match)=>{
          if(match){
            // return res.json({message:"signed in successfully"})
            const token=jwt.sign({_id:savedUser.id},Jwt_secret)
            res.json(token);
            console.log(token)

          }else{
            return res.json({error:"Invalid password"})
          }
   })
})


})

module.exports = router;
