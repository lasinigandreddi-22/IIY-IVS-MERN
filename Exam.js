const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: String,
  marks: Number,
  remarks: String,
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);