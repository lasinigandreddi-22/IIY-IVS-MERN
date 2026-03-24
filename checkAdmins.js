const mongoose = require("mongoose");
const User = require("./backend/models/User");

mongoose.connect("mongodb://localhost:27017/studentDB");

async function run() {
    const users = await User.find({ role: "admin" });
    console.log("Admins:", users);
    process.exit(0);
}
run();
