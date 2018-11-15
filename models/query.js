var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Pranshu@511',
  database: process.env.DB_NAME || 'DBMS_PROJECT',
});

const selectQuery = q => {
  return new Promise((resolve, reject) => {
    con.query(q, (err, result) => {
      if(err){
        reject(err);
      }
      else
        resolve(result);
    });
  });
};

const insertQuery = (q,data) => {
  return new Promise((resolve, reject) => {
    con.query(q, data, (err, result) => {
      if(err){
        reject(err);
      }
      else
        resolve(result);
    });
  });
};

module.exports = {
  selectQuery,
  insertQuery
}
