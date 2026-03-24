const axios = require('axios');

async function testAPIs() {
    try {
        console.log("CodeChef Node...");
        const res = await axios.get("https://codechef-api.vercel.app/handle/tourist");
        console.log("CC:", res.data);
    } catch (e) { console.log(e.message); }

    try {
        console.log("CodeChef API 2...");
        const res = await axios.get("https://codechef-api.vercel.app/tourist");
        console.log("CC2:", Object.keys(res.data));
    } catch (e) { console.log(e.message); }

    try {
        console.log("GFG Node...");
        const res = await axios.get("https://geeks-for-geeks-api.vercel.app/sandeepsing");
        console.log("GFG:", Object.keys(res.data), res.data.info);
    } catch (e) { console.log(e.message); }
}
testAPIs();
