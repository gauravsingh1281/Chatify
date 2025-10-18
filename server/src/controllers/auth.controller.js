import { generateToken } from "../lib/utils.lib.js";
import { sendWelcomeEmail } from "../emails/email.handlers.js";
import { ENV } from "../lib/env.lib.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) return res.status(400).json({ message: "All fields are required." });
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long." });
        const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!validateEmail.test(email)) return res.status(400).json({ message: "Invalid email format" });

        const isUserAlreadyExists = await User.findOne({ email })
        if (isUserAlreadyExists) return res.status(409).json({ message: "User already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            res.status(201).json({
                _id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.profilePic,
            });
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.log("Failed to send welcome email", error);
            }
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal server error" })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ message: "Invalid Credentials" });
        const verifyPassword = await bcrypt.compare(password, foundUser.password);
        if (!verifyPassword) return res.status(400).json({ message: "Invalid Credentials" });
        generateToken(foundUser._id, res);
        res.status(200).json({
            _id: foundUser._id,
            fullName: foundUser.fullName,
            email: foundUser.email,
            profilePic: foundUser.profilePic,
        })
    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const logout = (_, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User Logged out successfully" });
};