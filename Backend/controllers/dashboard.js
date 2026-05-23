const Admin = require("../models/admin");
const Student = require("../models/student");


// admin dasboard
const getAdminDashboard = async (req, res) => {

    try {

        const admin = await Admin.findById(req.user.id)
            .populate("createdCourses");

        if(!admin){
            return res.status(404).json({
                success:false,
                message:"Admin not found"
            });
        }

        res.status(200).json({
            success:true,
            courses:admin.createdCourses
        });

    } catch (error) {

        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

// student dashboard
const getStudentDashboard = async (req, res) => {

    try {
        // console.log(req.user.id);
        const student = await Student.findById(req.user.id)
            .populate("registeredCourses");

        // console.log(student);
        res.status(200).json({
            success: true,
            courses: student.registeredCourses,
        });

    } catch (error) {

        console.log(error);
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    getAdminDashboard,
    getStudentDashboard,
};