const matchesPerTeamPerYear = (databaseName , connection) => {
    return connection.query(`USE ${databaseName}`).then( () => {
        const query = `SELECT winner,Season , Count( Season AND winner ) As Count
        FROM Matches
        WHERE winner != ""
        GROUP BY Season , winner
        ORDER BY winner , season ASC;`
        return connection.query(query);
    })
}
module.exports.matchesPerTeamPerYear = matchesPerTeamPerYear;