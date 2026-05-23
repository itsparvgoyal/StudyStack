const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/User");
const {isAuthenticated,isAdmin,isStudent} = require("../middlewares/auth");
const {addCourse , deleteCourse , updateCourse , getAllCourses , getCourse} = require("../controllers/course");
const {acceptRequest , rejectRequest , requestCourse , getPendingRequests} = require("../controllers/req"); 
const { getAdminDashboard, getStudentDashboard } = require("../controllers/dashboard");

router.post("/register",registerUser);
router.post("/login",loginUser);


router.post("/student",isAuthenticated,isStudent, (req,res) => {
    res.status(200).json({
        success:true,
        message:"Student authenticated",
        user:req.user
    });
});
router.post("/student/enrollCourse", isAuthenticated,isStudent , requestCourse);


router.post("/admin",isAuthenticated,isAdmin , (req,res) => {
    res.status(200).json({
        success:true,
        message:"Admin authenticated",
        user:req.user
    });
});
router.post("/admin/addCourse" , isAuthenticated , isAdmin , addCourse);
router.put("/admin/acceptRequest",isAuthenticated , isAdmin , acceptRequest);
router.get("/admin/requests", isAuthenticated , isAdmin , getPendingRequests);
// pending to verify 
router.put("/admin/updateCourse/:id",isAuthenticated , isAdmin , updateCourse);
router.put("/admin/rejectRequest",isAuthenticated , isAdmin , rejectRequest);
router.delete("/admin/deleteCourse/:id",isAuthenticated , isAdmin , deleteCourse);


router.get("/getAllCourses", getAllCourses);
router.get("/course/getCourse/:id", getCourse);


router.get("/admin/dashboard", isAuthenticated, isAdmin, getAdminDashboard);    
router.get("/student/dashboard", isAuthenticated, isStudent, getStudentDashboard);

module.exports = router;    