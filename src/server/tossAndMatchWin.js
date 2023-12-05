const tossAndMatchWin = (databaseName, connection) => {
  return connection.query(`USE ${databaseName}`).then(() => {
    const query = `SELECT winner , count(winner)
                    FROM Matches
                    WHERE winner = toss_winner
                    GROUP BY winner;`
    return connection.query(query);
  });
};
module.exports.tossAndMatchWin = tossAndMatchWin;