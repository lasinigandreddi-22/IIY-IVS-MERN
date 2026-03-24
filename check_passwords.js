const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function checkPasswords() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, "email password");
        console.log("\n--- Password Hash Check ---");
        users.forEach(u => {
            const isHash = u.password.startsWith("$2b$") || u.password.startsWith("$2a$");
            console.log(`Email: ${u.email}, Looks like hash: ${isHash}, Length: ${u.password.length}`);
        });
        await mongoose.disconnect();
    } catch (err) {
        console.error("Error:", err);
    }
}

checkPasswords();
