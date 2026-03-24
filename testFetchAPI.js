const axios = require('axios');

async function testFetch() {
    try {
        const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
            loginId: "24B11AI121",
            password: "123456"
        });
        const token = loginRes.data.token;
        console.log("Logged in successfully. Fetching stats...");

        const statsRes = await axios.post("http://localhost:5000/api/coding/fetch-stats", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Stats Fetched:");
        console.dir(statsRes.data, { depth: null });
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
    }
}
testFetch();
