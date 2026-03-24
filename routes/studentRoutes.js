const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ✅ Add Student
router.post("/students", async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      department,
      year,
      email,
      password,
      phoneNumber,
      section,
      leetcodeUsername,
      hackerrankUsername,
      codechefUsername,
      gfgUsername,
      totalSolved
    } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email already exists" });
    }

    const score = (totalSolved || 0) * 10; // Score calculation logic

    const newStudent = new Student({
      name,
      rollNumber,
      department,
      year,
      email,
      password, // Stored raw as per original logic
      phoneNumber,
      section,
      leetcodeUsername,
      hackerrankUsername,
      codechefUsername,
      gfgUsername,
      totalSolved: totalSolved || 0,
      score
    });

    await newStudent.save();

    // Create User record for auth
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "student",
      department
    });

    await user.save();

    res.json({ message: "Student Added Successfully" });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json(err);
  }
});

// Get All Students (Leaderboard sorted)
router.get("/students", async (req, res) => {
  const students = await Student.find().sort({ score: -1 });
  res.json(students);
});


// ✅ Update Student
router.put("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updates = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const oldEmail = student.email;

    // recalculate score if totalSolved changes
    if (updates.totalSolved !== undefined) {
      updates.score = updates.totalSolved * 10;
    }

    // If password is empty string, don't update it
    if (updates.password === "") {
      delete updates.password;
    }

    let userUpdates = {};
    if (updates.email || updates.name || updates.department) {
      userUpdates.name = updates.name || student.name;
      userUpdates.email = updates.email || student.email;
      userUpdates.department = updates.department || student.department;
    }

    Object.assign(student, updates);
    await student.save();

    if (updates.password) {
      userUpdates.password = await bcrypt.hash(updates.password, 10);
    }

    // Also update the User document if needed
    if (Object.keys(userUpdates).length > 0) {
      await User.findOneAndUpdate({ email: oldEmail }, userUpdates);
    }

    res.json({ message: "Student updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ Delete Student
router.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(req.params.id);

    // Also delete the User account
    await User.findOneAndDelete({ email: student.email });

    res.json({ message: "Student removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = router;