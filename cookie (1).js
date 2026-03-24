const express = require("express")
const session = require("express-session");
const cookieParser = require("cookie-parser")

const app = express();

 app.use(cookieParser());

 app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true

 }));

app.get("/", (req, res) => {
    res.send("Welcome! Go to /login to start session.");
});

app.get("/login", (req, res) => {
    req
    .session.username = "Shanmukh";
    res.send("Session Created! Go to /profile");
});

app.get("/profile", (req, res) => {
    if(req.session.username) {
        res.send("Hello" + req.session.username )
    } else {
        res.send("No session found! please login.")
    }
});

app.get("/logout", (req, res) => {
    req.send.destroy();
    res.send("Session Destroyed!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});