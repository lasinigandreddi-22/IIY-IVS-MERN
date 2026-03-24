const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create dummy user
router.post("/create", async (req, res) => {

    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;