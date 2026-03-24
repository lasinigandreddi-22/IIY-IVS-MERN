const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  department: String,
  section: String,
  year: String,
  email: String,
  password: String,

  phoneNumber: String,
  leetcodeUsername: String,
  hackerrankUsername: String,
  codechefUsername: String,
  gfgUsername: String,
  totalSolved: { type: Number, default: 0 },
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model("Student", studentSchema);