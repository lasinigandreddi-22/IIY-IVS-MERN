const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // ADDED BCRYPT

const ProfileRequest = require("../models/ProfileUpdateRequest");
const User = require("../models/User");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ================= CHANGE PASSWORD =================
router.post("/change-password", authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Error changing password:", err);
        res.status(500).json({ error: "Failed to change password" });
    }
});

// ================= GET OWN PROFILE =================

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role; // assumed to be extracted from token in authMiddleware

        const userAccount = await User.findById(userId);
        if (!userAccount) {
            return res.status(404).json({ message: "User not found" });
        }

        let profileData = null;

        if (userRole === "student") {
            profileData = await Student.findOne({ email: userAccount.email });
        } else if (userRole === "faculty") {
            profileData = await Faculty.findOne({ email: userAccount.email });
        }

        if (!profileData) {
            return res.status(404).json({ message: "Profile details not found" });
        }

        res.json(profileData);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Server error fetching profile details" });
    }
});


// ================= STUDENT SUBMIT UPDATE =================

router.post("/submit", authMiddleware, async (req, res) => {

    const request = new ProfileRequest({
        userId: req.user.id,
        newData: req.body
    });

    await request.save();

    res.json({ message: "Request Submitted" });
});


// ================= ADMIN VIEW PENDING =================

router.get("/pending",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {

        const requests = await ProfileRequest.find({
            status: "Pending"
        }).populate("userId", "name email");

        res.json(requests);
    });


// ================= ADMIN APPROVE =================

router.put("/approve/:id",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {

        const request = await ProfileRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        request.status = "Approved";
        await request.save();

        await User.findByIdAndUpdate(
            request.userId,
            request.newData
        );

        res.json({ message: "Approved Successfully" });
    });

module.exports = router;
