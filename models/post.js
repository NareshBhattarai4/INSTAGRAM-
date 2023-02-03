const mongoose=require("mongoose");
const {ObjectId}=mongoose.SchemaTypes;
const Usertype = mongoose.model("Usertype");

const postScheme=new mongoose.Schema({
   body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{
      type:ObjectId,
      ref:"Usertype"
    }],

    postedBy:{
       type:ObjectId,
       ref:"Usertype"
    }
})
mongoose.model("POST",postScheme);