const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Student = require("./models/Student");
const Faculty = require("./models/Faculty");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/studentDB";

async function seedDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Define default passwords
        const adminPass = await bcrypt.hash("admin123", 10);
        const studentPass = await bcrypt.hash("student123", 10);
        const facultyPass = await bcrypt.hash("faculty123", 10);

        // 1. Seed Admin
        const existingAdmin = await User.findOne({ role: "admin" });
        if (!existingAdmin) {
            await new User({
                name: "System Admin",
                email: "admin@system.com",
                password: adminPass,
                role: "admin",
            }).save();
            console.log("✅ Admin created (Login ID: admin, Password: admin123)");
        } else {
            console.log("ℹ️ Admin already exists.");
        }

        // 2. Seed Student
        const existingStudent = await Student.findOne({ rollNumber: "S1001" });
        if (!existingStudent) {
            // Create in Student Collection
            await new Student({
                name: "John Doe",
                rollNumber: "S1001",
                department: "CSE",
                section: "A",
                year: "3",
                email: "student@test.com",
                password: "student123", // some places might store raw, some hash
            }).save();

            // Create in User Collection for Login
            await new User({
                name: "John Doe",
                email: "student@test.com",
                password: studentPass,
                role: "student",
                department: "CSE",
                section: "A",
            }).save();
            console.log("✅ Student created (Login ID: S1001, Password: student123)");
        } else {
            console.log("ℹ️ Student S1001 already exists.");
        }

        // 3. Seed Faculty
        const existingFaculty = await Faculty.findOne({ rollNumber: "F1001" });
        if (!existingFaculty) {
            // Create in Faculty Collection
            await new Faculty({
                name: "Dr. Smith",
                rollNumber: "F1001",
                department: "CSE",
                email: "faculty@test.com",
                password: "faculty123",
            }).save();

            // Create in User Collection for Login
            await new User({
                name: "Dr. Smith",
                email: "faculty@test.com",
                password: facultyPass,
                role: "faculty",
                department: "CSE",
            }).save();
            console.log("✅ Faculty created (Login ID: F1001, Password: faculty123)");
        } else {
            console.log("ℹ️ Faculty F1001 already exists.");
        }

        console.log("Seeding completed successfully.");
    } catch (err) {
        console.error("❌ Error while seeding:", err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seedDB();
