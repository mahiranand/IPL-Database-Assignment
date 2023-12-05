const topTenBowler2015 = (databaseName, connection) => {
  return connection.query(`USE ${databaseName}`).then(() => {
    const query = `SELECT bowler , SUM(batsman_runs+noball_runs+wide_runs)/COUNT(CASE WHEN wide_runs = 0 AND noball_runs = 0 THEN bowler END )*6 AS Economy
                    FROM Deliveries
                    JOIN Matches 
                        ON match_id = Id
                        Where Season = 2015 
                        GROUP BY bowler
                        ORDER BY Economy ASC
                        LIMIT 10;`;

    return connection.query(query);
  });
};
module.exports.topTenBowler2015 = topTenBowler2015;