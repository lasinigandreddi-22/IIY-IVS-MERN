const mongoose = require("mongoose");
const User = require("./models/User");
const Student = require("./models/Student");
const Faculty = require("./models/Faculty");
require("dotenv").config();

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const students = await Student.find({}, "name rollNumber email");
        console.log("\n--- Students ---");
        students.forEach(s => console.log(`Name: ${s.name}, Roll: '${s.rollNumber}', Email: ${s.email}`));

        const faculty = await Faculty.find({}, "name rollNumber email");
        console.log("\n--- Faculty ---");
        faculty.forEach(f => console.log(`Name: ${f.name}, Roll: '${f.rollNumber}', Email: ${f.email}`));

        await mongoose.disconnect();
    } catch (err) {
        console.error("Error:", err);
    }
}

checkUsers();
