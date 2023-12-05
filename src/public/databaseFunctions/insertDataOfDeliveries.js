const insertDataOfDeliveries = (databaseName, connection, deliveries) => {
  return connection
    .query(`USE ${databaseName}`)
    .then(() => {
      const createDeliveryTableQuery =
        "CREATE TABLE IF NOT EXISTS Deliveries(match_id INT,inning INT,batting_team VARCHAR(50),bowling_team VARCHAR(50),`over` INT,ball INT,batsman VARCHAR(50),non_striker VARCHAR(50),bowler VARCHAR(50),is_super_over INT,wide_runs INT,bye_runs INT,legbye_runs INT,noball_runs INT,penalty_runs INT,batsman_runs INT,extra_runs INT,total_runs INT, player_dismissed VARCHAR(50),dismissal_kind VARCHAR(100),fielder VARCHAR(50))";

      return connection.query(createDeliveryTableQuery);
    })
    .then(() => {
      return connection.query("SELECT COUNT(*) AS total_rows FROM Deliveries");
    })
    .then((data) => {
      if (data[0][0].total_rows != deliveries.length) {
        const insertDataIntoTable = `INSERT INTO Deliveries VALUES ?`;
        return connection.query(insertDataIntoTable, [
          deliveries.map(Object.values),
        ]);
      }
    });
};
module.exports.insertDataOfDeliveries = insertDataOfDeliveries;
