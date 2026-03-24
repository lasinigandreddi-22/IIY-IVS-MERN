const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true }, // Used as ID
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    age: Number,
    password: { type: String, required: true }
});

module.exports = mongoose.model("Faculty", facultySchema);
