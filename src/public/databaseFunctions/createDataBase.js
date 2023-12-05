const createDataBase = (databaseName, connection) => {
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
  return connection.query(createDatabaseQuery);
};

module.exports.createDataBase = createDataBase;
