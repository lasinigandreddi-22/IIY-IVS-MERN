const axios = require('axios');
const cheerio = require('cheerio');

async function testScraping() {
    try {
        console.log("Testing CodeChef...");
        const codechefUser = "gennady.korotkevich";
        const { data: ccData } = await axios.get(`https://www.codechef.com/users/${codechefUser}`, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        const $ = cheerio.load(ccData);
        const text = $.text();
        const globalRank = $(".rating-ranks .inline-list li a strong").first().text();
        const fullySolvedStr = $('h5:contains("Fully Solved")').text();
        let problemsSolved = 0;

        let match1 = fullySolvedStr.match(/\((\d+)\)/);
        if (match1) problemsSolved = parseInt(match1[1]);
        else {
            let backupMatch = ccData.match(/Fully Solved\s*\(\s*(\d+)\s*\)/i);
            if (backupMatch) problemsSolved = parseInt(backupMatch[1]);
        }
        console.log(`CodeChef (gennady): Solved: ${problemsSolved || 'FAIL'}, Global Rank: ${globalRank}`);
    } catch (e) { console.error("Codechef Error", e.message); }

    try {
        console.log("\nTesting GFG...");
        const gfgUser = "sandeepsing"; // valid GFG profile
        const { data: gfgData } = await axios.get(`https://auth.geeksforgeeks.org/user/${gfgUser}/practice/`, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });
        let totalSolved = 0;
        let match = gfgData.match(/>(\d+)</g); // just testing naive
        const backupTotal = gfgData.match(/"totalProblemsSolved"\s*:\s*(\d+)/i) ||
            gfgData.match(/Problems Solved.*?>\s*(\d+)\s*</i) ||
            gfgData.match(/total_problem_solved\s*:\s*(\d+)/i);

        if (backupTotal) {
            totalSolved = parseInt(backupTotal[1]);
        } else {
            // New UI GFG might require an API call or different regex
            const searchTotal = gfgData.match(/overall_coding_score".*?\d+.*?(\d+)/); // guessing
        }
        console.log(`GFG (sandeepsing): Solved: ${totalSolved || 'FAIL'}`);
    } catch (e) { console.error("GFG Error:", e.message); }
}

testScraping();
