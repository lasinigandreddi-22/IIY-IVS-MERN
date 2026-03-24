// ================= IMPORT PACKAGES =================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ================= IMPORT ROUTES =================

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoutes");
const codingRoutes = require("./routes/codingRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const timetableRoutes = require("./routes/timetableRoutes"); // Added Timetable

// ================= IMPORT MIDDLEWARE =================

const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

// ================= CREATE APP =================

const app = express();

// ================= GLOBAL MIDDLEWARE =================

app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Auth routes
app.use("/api/auth", authRoutes);

// User routes
app.use("/api/users", userRoutes);

// Student & Faculty routes
app.use("/api", studentRoutes);
app.use("/api", facultyRoutes);

// Profile routes
app.use("/api/profile", profileRoutes);

// Attendance routes
app.use("/api/attendance", attendanceRoutes);

// Timetable routes
app.use("/api/timetable", timetableRoutes); // Added Timetable route

//Exam routes
app.use("/api/exams", examRoutes);

//performance routes
app.use("/api/coding", codingRoutes);


// ================= TEST ROUTES =================

// Protected route
app.get("/protected", authMiddleware, (req, res) => {
    res.send("Protected Route Accessed");
});

// Admin route
app.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.send("Admin Route");
});

// Faculty route
app.get("/faculty", authMiddleware, roleMiddleware("faculty"), (req, res) => {
    res.send("Faculty Route Accessed");
});

// Basic test route
app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

// ================= DATABASE CONNECTION =================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
