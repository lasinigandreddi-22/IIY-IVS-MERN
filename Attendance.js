const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timetableSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "Timetable" }, // Link to specific slot
  targetClass: String, // e.g. "CSE-A"
  subject: String,
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model("Attendance", attendanceSchema);