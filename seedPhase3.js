const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Faculty = require("./models/Faculty");
const Timetable = require("./models/Timetable");

mongoose.connect("mongodb://localhost:27017/studentDB");

async function seedData() {
    try {
        // 1. Create a dummy Faculty User for testing
        let email = "faculty1@test.com";
        let faculty = await Faculty.findOne({ email });

        if (!faculty) {
            faculty = new Faculty({
                name: "Dr. Smith",
                rollNumber: "F1001",
                department: "CSE",
                email,
                password: "password123"
            });
            await faculty.save();

            const hashedPassword = await bcrypt.hash("password123", 10);
            const user = new User({
                name: "Dr. Smith",
                email,
                password: hashedPassword,
                role: "faculty",
                department: "CSE"
            });
            await user.save();
            console.log("Created dummy faculty:", faculty.name);
        } else {
            console.log("Dummy faculty already exists.");
        }

        // 2. Clear existing timetable for this faculty
        await Timetable.deleteMany({ facultyId: faculty._id });

        // 3. Create dummy Timetable Schedule
        const schedule = [
            { facultyId: faculty._id, day: "Monday", timeSlotIndex: 0, targetClass: "CSE-A", subject: "Data Structures" },
            { facultyId: faculty._id, day: "Monday", timeSlotIndex: 1, targetClass: "CSE-B", subject: "Data Structures" },
            { facultyId: faculty._id, day: "Tuesday", timeSlotIndex: 3, targetClass: "IT-A", subject: "Algorithms" },
            { facultyId: faculty._id, day: "Wednesday", timeSlotIndex: 5, targetClass: "CSE-A", subject: "Lab" },
            { facultyId: faculty._id, day: "Wednesday", timeSlotIndex: 6, targetClass: "CSE-A", subject: "Lab" },
            { facultyId: faculty._id, day: "Friday", timeSlotIndex: 2, targetClass: "CSE-C", subject: "Operating Systems" },
        ];

        await Timetable.insertMany(schedule);
        console.log("Inserted dummy timetable slots.");

    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

seedData();
