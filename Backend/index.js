const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");    
dotenv.config();
const app = express();
const bcrypt = require("bcrypt");   
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(
   fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
   })
);

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));   

app.use("/api/v1", require("./router/routes"));


app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})

const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect();

const connectdb = require("./config/database"); 
connectdb();