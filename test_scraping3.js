const axios = require('axios');
async function test() {
    try {
        const { data } = await axios.get("https://www.codechef.com/users/tourist", { headers: { "User-Agent": "Mozilla/5.0" } });
        let match = data.match(/Fully Solved.*?\((\d+)\)/);
        let match2 = data.match(/"problems_solved"\s*:\s*(\d+)/) || data.match(/"problems_solved":"(\d+)"/);
        let match3 = data.match(/<h3>Total Problems Solved: (\d+)<\/h3>/);
        let m4 = data.match(/rating-number">(\d+)/)
        console.log("CC matches:", match?.[1], match2?.[1], match3?.[1], m4?.[1]);
    } catch (e) { console.log(e.message); }

    try {
        const { data } = await axios.get("https://auth.geeksforgeeks.org/user/sandeepsing/practice/", { headers: { "User-Agent": "Mozilla/5.0" } });
        let g1 = data.match(/Problems Solved:.*?(\d+)/i);
        let g2 = data.match(/"problemSolved"\s*:\s*(\d+)/i);
        let g3 = data.match(/problem_solved.*?(\d+)/i) || data.match(/problems.*?(\d+)/i);
        let g4 = data.match(/"score"\s*:\s*(\d+)/i);
        console.log("GFG matches:", g1?.[1], g2?.[1], g3?.[1], g4?.[1]);
    } catch (e) { console.log(e.message); }
}
test();
