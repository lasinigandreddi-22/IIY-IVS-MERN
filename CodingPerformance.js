const mongoose = require("mongoose");

const codingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  platform: String,
  problemsSolved: Number,
  rating: Number,
  rank: Number,
  score: Number
});

module.exports = mongoose.model("CodingProfile", codingSchema);