const Student = require("../models/student");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailTransporter = require("../config/mailTransporter");
require("dotenv").config();
function ckeckEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // console.log(name , email , password , role);

        if (!name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!ckeckEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }   

        // verify that user does not exist in student and admin database
        const isExist = await Student.findOne({email}) || await Admin.findOne({email});
        // console.log("is exist", isExist);
        if(isExist){
            return res.status(400).json({message:"User already exists"});
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        if (role === "Admin") {
            user = await Admin.create({ name, email, password: hashedPassword, role: role });
        } else {
            user = await Student.create({ name, email, password: hashedPassword, role: role });
        }

        // JWT token generation
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.token = token;

        // send token in cookie with httpOnly
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        // hide password from user so that no one can see in response 
        user.password = undefined;

        // send mail to user who created the account
            await mailTransporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Successfull Registration on StudyStack",
                html: `
                    <p>
                        Your account has been registered successfully on StudyStack.
                        <br/>
                        You can login now.
                    </p>
                `
            });
            // console.log("mail sent")

        res.status(201).json({
            message: "User registered successfully",
            token,
            user
        });
    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({ message: "Error in registering user" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email , password);

        if (!email.trim() || !password.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!ckeckEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const user = await Student.findOne({ email }) || await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // JWT token generation
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.token = token;

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        user.password = undefined;

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({ message: "Error in logging in user" });
    }
}

module.exports = { registerUser, loginUser };
