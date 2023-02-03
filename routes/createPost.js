const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middlewares/requirelogin");
const POST=mongoose.model("POST");
const cors = require("cors")
mongoose.connect("mongodb://127.0.0.1:27017/instaData");

 router.get("/allposts",requirelogin,(req,res)=>{
    POST.find()
    .populate("postedBy","_id userName")
    .then(posts=> res.json(posts))
    .catch(err=> console.log(err))
 })

router.post("/createPost",requirelogin,(req,res)=>{
    const {body,pic}=req.body;
   
    if(!body || !pic){
        return res.json({error:"Please add all the fields"});
    }
   req.user;
   const post=new POST({
    body,
    photo:pic,
    postedBy:req.user
   })
   post.save().then((result)=>{
    res.json({post:result})
   }).catch(err=>console.log(err));
 
})
router.get("/myposts",requirelogin,(req,res)=>{
   POST.find({postedBy:req.user._id})
   .populate("postedBy","_id name")
   .then(myposts=>res.json(myposts))
})
// router.put("/like",requirelogin,(req,res)=>{
//   POST.findByIdAndUpdate(req.body.postId,{
//    $push:{likes:req.user._id}
//   },{
//    new:true
//   }).exec((err,result)=>{
//    if(err){
//       return res67bn
//    }
//   })
// })
module.exports = router