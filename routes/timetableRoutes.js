const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");
const authMiddleware = require("../middleware/authMiddleware");

// ================= FETCH TIMETABLE BY FACULTY ID =================
router.get("/:facultyId", authMiddleware, async (req, res) => {
    try {
        const schedule = await Timetable.find({ facultyId: req.params.facultyId });
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching timetable" });
    }
});

// ================= ADMIN: UPSERT SCHEDULE SLOTS =================
router.post("/upsert", authMiddleware, async (req, res) => {
    try {
        const { facultyId, scheduleData } = req.body;

        // Remove existing slots for this faculty first
        await Timetable.deleteMany({ facultyId });

        // Insert new slots
        if (scheduleData && scheduleData.length > 0) {
            await Timetable.insertMany(scheduleData.map(slot => ({
                ...slot,
                facultyId
            })));
        }

        res.json({ message: "Timetable updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error updating timetable" });
    }
});

module.exports = router;
