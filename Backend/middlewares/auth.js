const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/student");
const Admin = require("../models/admin");


// middleware to check if user is authenticated or not
const isAuthenticated = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // check in DB
        let user;

        if(decoded.role === "Student"){
            user = await User.findById(decoded.id);
        }
        else if(decoded.role === "Admin"){
            user = await Admin.findById(decoded.id);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // attach user
        req.user = decoded;

        next();

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });

    }
};


// middleware to check role is admin or not
const isAdmin = async (req, res, next) => {

    try {
        // console.log("hello ji admin" , req.user);

        if (req.user.role !== "Admin") {

            return res.status(403).json({
                success: false,
                message: "Only admin allowed"
            });

        }

        next();

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Admin auth failed"
        });

    }
};



// middleware to check role is student or not
const isStudent = async (req, res, next) => {

    try {

        if (req.user.role !== "Student") {

            return res.status(403).json({
                success: false,
                message: "Only student allowed"
            });

        }
        next();

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Student auth failed"
        });

    }
};

module.exports = {
    isAuthenticated,
    isAdmin,
    isStudent
};