const ReqForm = require("../models/reqForm");
const Course = require("../models/course");
const Student = require("../models/student");
const mailTransporter = require("../config/mailTransporter");
const Admin = require("../models/admin");  
require("dotenv").config();


// middleware to accept  request
const acceptRequest = async (req, res) => {
    try {

        const { reqFormId } = req.body;

        const reqform = await ReqForm.findById(reqFormId);

        if (!reqform) {
            return res.status(404).json({
                success: false,
                message: "Enrollment req not found"
            });
        }

        // check if already accepted or rejected
        if(reqform.status !== "Pending") {
            return res.status(400).json({
                success:false,
                message:"Request already accepted or rejected"
            });
        }

        // check if admin is authorised for this course or not 
        const adminId = req.user.id;
        const course = await Course.findById(reqform.course);
        if(course.createdBy.toString() != adminId){
            return res.status(400).json({
                success:false,
                message:"You are not authorised for this course"
            });
        }

        // status update
        reqform.status = "Approved";
        // reqform update krdia and save krdo db me
        await reqform.save();

        // student me course add
        await Student.findByIdAndUpdate(
            reqform.student,
            {
                $push: {
                    registeredCourses: reqform.course
                }
            }
        );

        // course me student add
        await Course.findByIdAndUpdate(
            reqform.course,
            {
                $push: {
                    enrolledStudents: reqform.student
                }
            }
        );

        // send mail to student that req is accepted
        const student = await Student.findById(reqform.student);    
        await mailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: "Enrollment Request Accepted",
            html: `
                <p>
                    Your enrollment request for the course ${course.name} has been accepted.
                    Please check it once on portal.
                </p>
            `
        });

        res.status(200).json({
            success: true,
            message: "Enrollment approved"
        });

    }
    catch (err) {
        console.log(err);
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

// middleware to reject  request
const rejectRequest = async (req, res) => {
    try {

        const { reqFormId } = req.body;
        const reqform = await ReqForm.findById(reqFormId);

        if (!reqform) {
            return res.status(404).json({
                success: false,
                message: "Enrollment req not found"
            });
        }

        // check if req is already accepted or rejected
        if(reqform.status !== "Pending") {
            return res.status(400).json({
                success:false,
                message:"Request already accepted or rejected"
            });
        }   

        // check if admin is authorised for this course or not 
        const adminId = req.user.id;
        const course = await Course.findById(reqform.course);
        if(course.createdBy.toString() != adminId){
            return res.status(400).json({
                success:false,
                message:"You are not authorised for this course"
            });
        }

        // status update
        reqform.status = "Rejected";
        // save krdo db me
        await reqform.save();

        // send mail to student that req is rejected
        const student = await Student.findById(reqform.student);  
        await mailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: "Enrollment Request Rejected",
            html: `
                <p>
                    Your enrollment request for the course "${course.name}" has been rejected.
                    <br/>
                    Better luck next time
                </p>
            `
        });
        res.status(200).json({
            success: true,
            message: "Enrollment rejected"
        });

    }
    catch (err) {
        console.log(err);
        console.error(err)
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

// middleware to request for course     
const requestCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body; 
        const course = await Course.findById(courseId);  
        // console.log("course id: " , courseId)
        if(!course) {
            return res.status(404).json({
                success:false,
                message:"Course not found"
            });  
        } 
    
        // check if req is already made 
        const isRequested = await ReqForm.findOne({student: userId, course: courseId});
        if(isRequested) {
            return res.status(200).json({
                success:false,
                message:"You have already requested for this course"
            });     
        }
        // console.log("is requested" , isRequested)

        // check if already enrolled
        if(course.enrolledStudents.includes(userId)){
            return res.status(400).json({
                success:false,
                message:"You are already enrolled in this course"
            });
        }

        const reqform = await ReqForm.create({
            student: req.user.id,
            course: courseId,
            status: "Pending"
        });  

        // send mail to admin that a new req for course is made
        const admin = await Admin.findById(course.createdBy); 
        const student = await Student.findById(req.user.id);
        
        await mailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: admin.email,
            subject: "New Enrollment Request",
            html: `
                <p>
                    A new enrollment request has been made for the course "${course.name}".
                    <br/>
                    Student: ${student.name} - "${student.email}"
                    <br/>
                    Please check it once on portal.
                </p>
            `
        });
        
        res.status(200).json({
            success:true,
            message:"Course requested successfully",
            reqform
        });  
    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            message: error.message
        }); 
    }   
}          
    

// Get pending enrollment requests for admin (courses created by admin)
const getPendingRequests = async (req, res) => {
  try {
    const adminId = req.user.id;
    // Find courses created by this admin
    const courses = await Course.find({ createdBy: adminId }).select('_id');
    const courseIds = courses.map(c => c._id);
    // Find pending reqforms for those courses
    const pending = await ReqForm.find({ course: { $in: courseIds }, status: 'Pending' })
      .populate('student', 'name email')
      .populate('course', 'title');
    res.status(200).json({ success: true, pending });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {acceptRequest , rejectRequest , requestCourse , getPendingRequests};