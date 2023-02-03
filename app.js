const express = require("express");
const app = express();
const port = process.env.port ||5000; 
const cors = require("cors")
const mongoose = require("Mongoose");
const path=require("path")

const Jwt_secret=require("./keys");
require("./models/model")
require("./models/post")


app.use(cors());
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(express.static(path.join(__dirname,"./frontend/build")))

mongoose.set('strictQuery', true);


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./frontend/build/index.html")),
    function (err){
        res.send(err)
    }
})


app.get("/", (req, res) => {
    res.json({
        message:"hello world"
    })
})

app.listen(port, () => {
    console.log("server is running at" + " " + port)
})