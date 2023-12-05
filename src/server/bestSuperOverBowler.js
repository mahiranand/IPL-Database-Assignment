const bestSuperOverBowler = (databaseName, connection) => {
  return connection.query(`USE ${databaseName}`).then(() => {
    const query = `SELECT bowler , SUM(batsman_runs+noball_runs+wide_runs)/COUNT(CASE WHEN wide_runs = 0 AND noball_runs = 0 THEN bowler END )*6 AS Economy
                    FROM Deliveries
                    WHERE is_super_over = 1
                    GROUP BY bowler
                    ORDER BY Economy ASC
                    LIMIT 1;`
    return connection.query(query);
  });
};
module.exports.bestSuperOverBowler = bestSuperOverBowler;
