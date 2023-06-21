const express =require("express");  
const mongoose= require("mongoose");
const cookieParser=require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

 
const IndexRouter = require("./routes/IndexRouter");
const AdminRouter = require("./routes/AdminRouter");
const UserRouter = require("./routes/UserRouter");

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/image",express.static("./image"));

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.use("/", IndexRouter);
app.use("/admin", AdminRouter);
app.use("/user", UserRouter);

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/TrelloApp").then(()=>{
app.listen(3001);
console.log("server started at link http://localhost:3001");
    console.log("Succesfully Connected to the mongodb server");
}).catch((err)=>{
    console.log(err);
})

