const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ✅ Add Faculty
router.post("/faculty", async (req, res) => {
    try {
        const { name, rollNumber, department, email, password, phoneNumber, age } = req.body;

        // Check if faculty already exists
        const existingFaculty = await Faculty.findOne({ email });
        if (existingFaculty) {
            return res.status(400).json({ message: "Faculty with this email already exists" });
        }

        // create Faculty record
        const newFaculty = new Faculty({
            name,
            rollNumber,
            department,
            email,
            password, // storing raw in Faculty for now as per Student pattern
            phoneNumber,
            age
        });

        await newFaculty.save();

        // Create a User record so they can log in
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: "faculty",
            department
        });

        await user.save();

        res.json({ message: "Faculty Added Successfully" });

    } catch (err) {
        res.status(500).json(err);
    }
});

// ✅ Get All Faculty
router.get("/faculty", async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.json(faculty);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ✅ Update Faculty
router.put("/faculty/:id", async (req, res) => {
    try {
        const facultyId = req.params.id;
        const updates = req.body;

        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        const oldEmail = faculty.email;

        // If password is empty string, don't update it
        if (updates.password === "") {
            delete updates.password;
        }

        let userUpdates = {};
        if (updates.email || updates.name || updates.department) {
            userUpdates.name = updates.name || faculty.name;
            userUpdates.email = updates.email || faculty.email;
            userUpdates.department = updates.department || faculty.department;
        }

        // Update Faculty document
        Object.assign(faculty, updates);
        await faculty.save();

        if (updates.password) {
            userUpdates.password = await bcrypt.hash(updates.password, 10);
        }

        // Also update the User document if needed
        if (Object.keys(userUpdates).length > 0) {
            await User.findOneAndUpdate({ email: oldEmail }, userUpdates);
        }

        res.json({ message: "Faculty updated successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// ✅ Delete Faculty
router.delete("/faculty/:id", async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        await Faculty.findByIdAndDelete(req.params.id);

        // Also delete the User account
        await User.findOneAndDelete({ email: faculty.email });

        res.json({ message: "Faculty removed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete faculty" });
    }
});

module.exports = router;
