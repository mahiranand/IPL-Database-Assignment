const matches = require("./src/data/matches.json");
const deliveries = require("./src/data/deliveries.json");
const mysql = require("mysql2/promise");
const {createDataBase} = require("./src/public/databaseFunctions/createDataBase");
const {insertDataOfMatches} = require("./src/public/databaseFunctions/insertDataOfMatches");
const {insertDataOfDeliveries} = require("./src/public/databaseFunctions/insertDataOfDeliveries");
const { matchesPerYear } = require("./src/server/matchesPerYear");
const { matchesPerTeamPerYear } = require("./src/server/matchesPerTeamPerYear");
const { extraRunsConceded } = require("./src/server/extraRunsConceded");

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
    // return matchesPerYear(databaseName, connection);
    // return matchesPerTeamPerYear(databaseName,connection);
    // return extraRunsConceded(databaseName,connection);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    connection.end();
  });
