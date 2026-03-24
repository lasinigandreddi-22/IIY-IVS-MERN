const mongoose = require("mongoose");
const Student = require("./models/Student");

mongoose.connect("mongodb://localhost:27017/studentDB");

async function run() {
    const student = await Student.findOne();
    if (student) {
        console.log("Student RollNo:", student.rollNumber);
        console.log("Student Password (Raw from Student Model):", student.password);
    } else {
        console.log("No student found");
    }
    process.exit(0);
}
run();
