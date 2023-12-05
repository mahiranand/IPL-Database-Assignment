const insertDataOfMatches = (databaseName, connection, matches) => {
  return connection
    .query(`USE ${databaseName}`)
    .then(() => {
      const createMatchesTableQuery = `CREATE TABLE IF NOT EXISTS Matches(
            id INT PRIMARY KEY,
            season VARCHAR(4),
            city VARCHAR(50),
            date DATE,
            team1 VARCHAR(50),
            team2 VARCHAR(50),
            toss_winner VARCHAR(50),
            toss_decision VARCHAR(10),
            result VARCHAR(10),
            dl_applied INT,
            winner VARCHAR(50),
            win_by_runs INT,
            win_by_wickets INT,
            player_of_match VARCHAR(50),
            venue VARCHAR(100),
            umpire1 VARCHAR(50),
            umpire2 VARCHAR(50),
            umpire3 VARCHAR(50)
        )`;
      return connection.query(createMatchesTableQuery);
    })
    .then(() => {
      return connection.query("SELECT COUNT(*) AS total_rows FROM Matches");
    })
    .then((data) => {
      if (data[0][0].total_rows != matches.length) {
          const insertDataIntoTableQuery = `INSERT INTO Matches VALUES ?`;
          return connection.query(insertDataIntoTableQuery, [
            matches.map((ele) => Object.values(ele)),
          ]);
      }
    });
};

module.exports.insertDataOfMatches = insertDataOfMatches;
