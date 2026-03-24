const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
    day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], required: true },
    timeSlotIndex: { type: Number, required: true }, // 0 to 7 to match frontend slots
    targetClass: { type: String, required: true }, // e.g., "CSE-A", "IT-B"
    subject: { type: String, required: true }      // e.g., "Data Structures", "OS"
});

module.exports = mongoose.model("Timetable", timetableSchema);
