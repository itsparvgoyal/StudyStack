const Admin = require("../models/admin");
const Course = require("../models/course");
const Student = require("../models/student");     
const mailTransporter = require("../config/mailTransporter");
require("dotenv").config();
// add course 
const cloudinary = require("cloudinary").v2;

const addCourse = async (req, res) => {

    try {
        // body data
        const {
            name,
            description,
            price,
            totalVideoLectures,
            totalAssignment,
            totalProject,
            courseLevel,
            courseCategory,
            courseStatus,
            capacity
        } = req.body;

        // thumbnail file
        const thumbnail = req.files.thumbnail;
        // console.log(req.files);

        // validation
        if (
            !name ||
            !description ||
            !price ||
            !totalVideoLectures ||
            !totalAssignment ||
            !totalProject ||
            !courseLevel ||
            !courseCategory ||
            !courseStatus ||
            !thumbnail ||
            !capacity
        ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // upload image
        const thumbnailUpload = await cloudinary.uploader.upload(
            thumbnail.tempFilePath,
            {
                folder: "UGAC",
            }
        );

        // create course
        const response = await Course.create({
            name,
            description,
            price,
            createdBy: req.user.id,
            totalVideoLectures,
            totalAssignment,
            totalProject,
            courseLevel,
            courseCategory,
            courseStatus,
            thumbnail: thumbnailUpload.secure_url,
            capacity,
        });

        // add course to admin
        await Admin.findByIdAndUpdate(
            req.user.id,
            {
                $push: {
                    createdCourses: response._id,
                },
            },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Course added successfully",
            course: response,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error in adding course",
        });
    }
};

// update course 
const updateCourse = async (req,res) => {
    try {
        // check course exist or not 
        const course = await Course.findById(req.params.id);
        if(!course){
            return res.status(400).json({message:"Course not found"});
        }

        // check if admin is authorised to update this course or not 
        // ! update krte waqt req.params.id me course id hai
        const adminId = req.user.id;
        
        if(course.createdBy.toString() != adminId){
            return res.status(400).json({message:"You are not authorised to update this course"});
        }

        // new data
        const {name,description,price,totalVideoLectures,totalAssignment,totalProject,courseLevel,courseCategory,courseStatus,capacity} = req.body;
        
        // thumbnail 
        const thumbnail = req.files?.thumbnail;
        // console.log(thumbnail);
        if(thumbnail){
            // delete old thumbnail 
            const deletedThumbnail = await cloudinary.uploader.destroy(course.thumbnail);
            if(!deletedThumbnail){
                return res.status(400).json({message:"Error in deleting old thumbnail"});
            }
        }
        // upload new thumbnail 
        const thumbnailUpload = await cloudinary.uploader.upload(thumbnail.tempFilePath,{folder:"UGAC"});
        if(!thumbnailUpload){
            return res.status(400).json({message:"Error in uploading new thumbnail"});
        }
        

        const response = await Course.findByIdAndUpdate(req.params.id,{name,description,price,totalVideoLectures,totalAssignment,totalProject,courseLevel,courseCategory,courseStatus,capacity , thumbnail:thumbnailUpload.secure_url},{new:true});
        
        if(!response){
            return res.status(400).json({message:"Error in updating course"});
        }

        // send mail to all student that this course is updated 
        const students = await Student.find({
            registeredCourses: req.params.id
        });

        // console.log(students);

        for (const student of students) {
               await Promise.all(
                students.map((student) =>
                    mailTransporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: student.email,
                        subject: "Course Updated",
                        html: `
                            <p>
                                The course ${course.name} has been updated.
                                <br/>
                                Please check it once.
                            </p>
                        `
                    })
                )
            );

            console.log("Mail sent to:", student.email);
        }
        res.status(201).json({success:true , message:"Course updated successfully",course:response});    

    } catch (error) {
        console .log(error);
        res.status(500).json({message:"Error in updating course"});
    }
}   

// delete course 
const deleteCourse = async (req,res) => {
    try {

        // check course exists or not 
        const course = await Course.findById(req.params.id);
        if(!course){
            return res.status(400).json({message:"Course not found"});
        }

        // check if admin is authorised to delete this course or not 
        // ! delete krte waqt req.params.id me course id hai
        const adminId = req.user.id;
        if(course.createdBy.toString() != adminId){
            return res.status(400).json({message:"You are not authorised to delete this course"});
        }
        
        const response = await Course.findByIdAndDelete(req.params.id);

        if(!response){
            return res.status(400).json({message:"Error in deleting course"});
        }

        // update admin course list 
        const user = await Admin.findByIdAndUpdate(adminId,{$pull:{createdCourses:req.params.id}}, {new:true}).populate("createdCourses");
        if(!user){   
            console.log("Error in deleting course from admin");
        }

        // remove the course from students also who enrolled in that course 
        const students = await Student.find({enrolledCourses:req.params.id});
        if(!students){
            console.log("Error in deleting course from students");
        }
        students.forEach(async (student) => {
            await student.updateOne({$pull:{enrolledCourses:req.params.id}});
        });

        res.status(201).json({success:true , message:"Course deleted successfully"});
    } catch (error) {
        console .log(error);
        res.status(500).json({message:"Error in deleting course"});
    }
}   

const getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find();
        // check if no courses are avail 
        if(courses.length === 0){
            return res.status(400).json({message:"No courses are available"});
        }
        res.status(200).json({
            success: true,
            data: courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        // console.log(req.params.id)
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({
            success: true,
            data: course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {addCourse,updateCourse,deleteCourse , getAllCourses,getCourse};