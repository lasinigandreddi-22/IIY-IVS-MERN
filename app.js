console.log("File is running");

const express = require('express');
const app = express();

app.get('/',(req, res) => {
	res.send("Home page");
});

app.get('/about', (req, res) => {
	res.send("About Page");
});

app.get('/contact', (req, res) => {
	res.send("Contact page");
});

app.listen(3001, () => {
	console.log("Server started on port 3000");
});