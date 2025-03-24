import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

import { generateTokenAndCookie } from "../utils/token.js";

export async function signup(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false ,message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 characters" });
        }
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const existingUserByUsername = await User
            .findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const PROFILE_PIC = ["/avatar1.png","/avatar2.png", "/avatar3.png"]
        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length
        )];
        
        const newUser = new User({
            email,
            password:hashPassword, 
            username,
            image 
        });
            generateTokenAndCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({success: true,user: {
                ...newUser._doc,
                password: ""
            }});
        
    } catch (error) {
        console.log("Error on signup", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function login(req, res) {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await
        User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }   
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            return res.status(400).json({success : false, message: "Invalid credentials"});
        } generateTokenAndCookie(user._id, res);
        res.status(200).json({success: true, user: {
            ...user._doc,
            password: ""
        }});
    }catch{
        console.log("Error on login controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function logout(req, res) {
    try {
        res.clearCookie("jwt_netflix");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error on logout", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function authCheck (req,res){
    try {
        res.status(200).json({success: true, user: req.user})
    } catch (error) {
        console.log("Error on authCheck", error.message);
        res.status(500).json ({ success: false, message: "Internal server error" });
    }
}