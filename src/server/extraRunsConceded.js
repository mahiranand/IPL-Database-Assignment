const extraRunsConceded = (databaseName, connection) => {
  return connection.query(`USE ${databaseName}`).then(() => {
    const query = `SELECT Bowling_Team,SUM(extra_runs)
                    FROM Deliveries
                    JOIN Matches
                    ON match_id = id
                    WHERE Season = 2016
                    GROUP BY Bowling_Team;`;
    return connection.query(query);
  });
};
module.exports.extraRunsConceded = extraRunsConceded;
