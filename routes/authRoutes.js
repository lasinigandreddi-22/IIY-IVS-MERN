const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

// REGISTER API
router.post("/register", async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        // check existing user
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User exists" });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        res.json({ message: "User Registered" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// LOGIN API
router.post("/login", async (req, res) => {

    try {

        const { password } = req.body;
        const loginId = req.body.loginId?.trim();

        if (!loginId) return res.status(400).json({ message: "Login ID is required" });

        let user = null;

        if (loginId.toLowerCase() === "admin") {
            // Find the admin user
            user = await User.findOne({ role: "admin" });
        } else {
            // Try to find a student or faculty by rollNumber (Case Insensitive)
            let person = await Student.findOne({ rollNumber: { $regex: new RegExp(`^${loginId}$`, "i") } });

            if (!person) {
                person = await Faculty.findOne({ rollNumber: { $regex: new RegExp(`^${loginId}$`, "i") } });
            }

            if (person) {
                // If person found, get their User record via email
                user = await User.findOne({ email: person.email });
            } else {
                // Fallback: try finding directly by email or loginId matches email in User
                user = await User.findOne({ email: { $regex: new RegExp(`^${loginId}$`, "i") } });
            }
        }

        if (!user) return res.status(400).json({ message: "Invalid Login ID or credentials" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        // generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;