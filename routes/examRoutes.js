const express = require("express");
const router = express.Router();

const Exam = require("../models/Exam");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ================= FACULTY ADD MARKS =================

router.post("/add",
    authMiddleware,
    roleMiddleware("faculty"),
    async (req, res) => {

        const { studentId, subject, marks, totalMarks } = req.body;

        const exam = new Exam({
            studentId,
            subject,
            marks,
            totalMarks
        });

        await exam.save();

        res.json({ message: "Marks Added Successfully" });
});


// ================= FACULTY ADD FEEDBACK =================

router.put("/feedback/:id",
    authMiddleware,
    roleMiddleware("faculty"),
    async (req, res) => {

        await Exam.findByIdAndUpdate(
            req.params.id,
            { feedback: req.body.feedback }
        );

        res.json({ message: "Feedback Added" });
});


// ================= STUDENT VIEW OWN MARKS =================

router.get("/my",
    authMiddleware,
    roleMiddleware("student"),
    async (req, res) => {

        const exams = await Exam.find({
            studentId: req.user.id
        });

        let totalScored = 0;
        let totalMax = 0;

        exams.forEach(e => {
            totalScored += e.marks;
            totalMax += e.totalMarks;
        });

        const percentage = totalMax > 0
            ? ((totalScored / totalMax) * 100).toFixed(2)
            : 0;

        res.json({
            exams,
            totalScored,
            totalMax,
            percentage: percentage + "%"
        });
});


// ================= ADMIN VIEW ALL =================

router.get("/all",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {

        const data = await Exam.find().populate("studentId", "name email");

        res.json(data);
});

module.exports = router;
