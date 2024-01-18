const db=require('./db');
const executeQuery = async ({ query, values }) => {
    try {
      const results = await db.query(query, values);
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      return { error };
    }
  };

  module.exports = executeQuery;