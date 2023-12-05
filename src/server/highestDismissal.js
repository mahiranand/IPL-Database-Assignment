const highestDismissal = (databaseName, connection) => {
  return connection.query(`USE ${databaseName}`).then(() => {
    const query = `SELECT bowler , batsman ,total_dismissals
                    FROM (SELECT batsman,bowler,RANK() OVER ( ORDER BY COUNT(bowler) DESC) AS ranking , COUNT(bowler) AS total_dismissals
                        FROM Deliveries
                        WHERE dismissal_kind IN ( "lbw" , "bowled", "caught") 
                        GROUP BY batsman,bowler) As bowler_batsman_wicket
                    WHERE ranking = 1;`;
    return connection.query(query);
  });
};
module.exports.highestDismissal = highestDismissal;
