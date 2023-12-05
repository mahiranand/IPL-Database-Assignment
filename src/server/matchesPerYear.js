const matchesPerYear = (databaseName, connection) => {
  return connection.query(`USE ${databaseName}`).then(() => {
    const findQuery = "SELECT Season , COUNT(Season) FROM Matches GROUP BY Season;"
    return connection.query(findQuery);
  });
};
module.exports.matchesPerYear = matchesPerYear;
