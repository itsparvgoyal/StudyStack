const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin",
    },  
    totalVideoLectures : {
        type : Number,
        required : true
    },
    totalAssignment : {
        type : Number,
        required : true
    },
    totalProject : {
        type : Number,
        required : true
    },
    courseLevel : {
        type : String,
        enum : ["Beginner","Intermediate","Advanced"],
        required : true
    },
    courseCategory : {
        type : String
    },
    courseStatus : {
        type : String,
        enum : ["Draft","Published","Archived"],
        default : "Draft"
    },  
    thumbnail : {
        type : String,
    },
    capacity : {
        type : Number,
        required : true
    } ,
    enrolledStudents : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
})  

const Course = mongoose.model("Course",courseSchema);

module.exports = Course;