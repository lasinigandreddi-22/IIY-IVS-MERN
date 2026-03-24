const mongoose = require("mongoose");

const profileUpdateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  requestedData: Object,
  proofDocument: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("ProfileUpdateRequest", profileUpdateSchema);