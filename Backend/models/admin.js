const mongoose = require("mongoose");

// schema for admin
const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["Admin"],
        default : "Admin"
    },
    createdCourses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
        }
    ]
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;