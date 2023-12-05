const playerOfEverySeason = (databaseName, connection) => {
  return connection.query(`USE ${databaseName}`).then(() => {
    const query = `SELECT season , player_of_match , total_time
                    FROM ( SELECT season, player_of_match, COUNT(season) AS total_time
                            FROM Matches
                            GROUP BY season, player_of_match) AS data_of_player_of_match
                    WHERE (season , total_time) IN (
                        SELECT season , Max(total_time) AS max_time
                        FROM ( SELECT season, player_of_match, COUNT(season) AS total_time
                            FROM Matches
                            GROUP BY season, player_of_match) AS data_of_player_of_matchy
                    GROUP BY season)
                    ORDER BY season ASC;`;
    return connection.query(query);
  });
};
module.exports.playerOfEverySeason = playerOfEverySeason;