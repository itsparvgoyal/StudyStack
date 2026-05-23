const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("MongoDB connected");
        })
        .catch((error)=>{
            console.log("error in db connection" , error);
            process.exit(1);
        })
    } catch (error) {
        console.log(error);
    }
} 

module.exports = connectdb;
