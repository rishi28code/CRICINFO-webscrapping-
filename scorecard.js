
const request = require("request");
const cheerio = require("cheerio");
function processScorecard(url) {

    request(url, cb);
}
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractMatchDetails(html);
    }
}
function extractMatchDetails(html) {
    let $ = cheerio.load(html);
    let descElem = $(".event .description");
    let result = $(".event .status-text");
    let stringArr = descElem.text().split(",");
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
    result = result.text();
    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    
    for (let i = 0; i < innings.length; i++) {
     
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentName = $(innings[opponentIndex]).find("h5").text();
        opponentName = opponentName.split("INNINGS")[0].trim();
        let cInning = $(innings[i]);
        console.log(`${venue}| ${date} |${teamName}| ${opponentName} |${result}`);
        let allRows = cInning.find(".table.batsman tbody tr");
        for (let j = 0; j < allRows.length; j++) {
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("batsman-cell");
            if (isWorthy == true) {
              
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
            
            }
        }
    }
    
}
module.exports = {
    ps: processScorecard
}
