const {Client} = require('pg');

const client = new Client({
  user: 'postgres',
  host: '13.59.61.33',
  database: 'Practice',
  password: 'QdfGh12Q',
  port: 5432
});
module.exports = client;