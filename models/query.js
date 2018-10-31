var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pranshu@511",
  database: "DBMS_PROJECT"
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