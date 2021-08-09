const { Pool } = require('pg');
const Ted = require('./Ted.js');

const myURI = Ted;

const pool = new Pool({
  connectionString: myURI,
});

// <-- export your model
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
