const strikeRateOfBatsman = (databaseName, connection) => {
  return connection.query(`USE ${databaseName}`).then(() => {
    const query = `SELECT season,batsman,SUM(batsman_runs)/COUNT(CASE WHEN wide_runs = 0 AND noball_runs = 0 THEN batsman END)*100 AS strike_rate
                    FROM Deliveries
                    JOIN Matches 
                        ON match_id = Id
                        WHERE batsman = "DA Warner"
                        GROUP BY Matches.season,batsman;`;
    return connection.query(query);
  });
};
module.exports.strikeRateOfBatsman = strikeRateOfBatsman;
