const matches = require("./src/data/matches.json");
const deliveries = require("./src/data/deliveries.json");
const mysql = require("mysql2/promise");
const {createDataBase} = require("./src/public/databaseFunctions/createDataBase");
const {insertDataOfMatches} = require("./src/public/databaseFunctions/insertDataOfMatches");
const {insertDataOfDeliveries} = require("./src/public/databaseFunctions/insertDataOfDeliveries");
const { matchesPerYear } = require("./src/server/matchesPerYear");
const { matchesPerTeamPerYear } = require("./src/server/matchesPerTeamPerYear");
const { extraRunsConceded } = require("./src/server/extraRunsConceded");
const { topTenBowler2015 } = require("./src/server/topTenBowler2015");
const { tossAndMatchWin } = require("./src/server/tossAndMatchWin");
const { playerOfEverySeason } = require("./src/server/playerOfEverySeason");
const { strikeRateOfBatsman } = require("./src/server/strikeRateOfBatsman");
const { highestDismissal } = require("./src/server/highestDismissal");
const { bestSuperOverBowler } = require("./src/server/bestSuperOverBowler");

var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Deepa@07", //use your own password
});

const databaseName = "Cricket"; // give a new name if this database exists

createDataBase(databaseName, connection)
  .then(() => {
    return Promise.all([
      insertDataOfMatches(databaseName, connection, matches),
      insertDataOfDeliveries(databaseName, connection, deliveries),
    ]);
  })
  .then(() => {
    return Promise.all([
      matchesPerYear(databaseName, connection),
      matchesPerTeamPerYear(databaseName, connection),
      extraRunsConceded(databaseName, connection),
      topTenBowler2015(databaseName, connection),
      tossAndMatchWin(databaseName, connection),
      playerOfEverySeason(databaseName, connection),
      strikeRateOfBatsman(databaseName,connection),
      highestDismissal(databaseName,connection),
      bestSuperOverBowler(databaseName, connection)
    ]);
  })
  .then((data) => {
    data.forEach((element,idx) => {
      console.log(`ANSWER OF QUES ${idx+1}`)
      console.log(element);
      console.log('\n')
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    connection.end();
  });
