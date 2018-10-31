var express = require('express');
var router = express.Router();
var { selectQuery, insertQuery } = require('../models/query');

//               GET 

router.get('/',async function(req, res) {
  let q = `SELECT * FROM Student ORDER BY RollNumber`;
  let students = await selectQuery(q);
  res.send(students);
});

router.get('/:rollNumber',async (req, res) => {
  let q = `SELECT * FROM Student WHERE RollNumber = ${ req.params.rollNumber }`;
  let student = await selectQuery(q);
  res.send(student[0]);
});

//              POST

router.post('/', (req, res) => {
  let q = `INSERT INTO Student SET ?`;
  insertQuery(q, req.body)
                .then(result => {
                  res.send({
                    status: 'OK',
                    result
                  });
                })
                .catch(err => {
                  res.status(400).send({
                    status: 'error',
                    err
                  })
                });
});

//              PUT

router.put('/:rollNumber', (req, res) => {
  let q = `UPDATE Student SET ? WHERE RollNumber = ${ req.params.rollNumber }`;
  insertQuery(q, req.body)
                .then(result => {
                  res.send({
                    status: 'OK',
                    result
                  });
                })
                .catch(err => {
                  res.status(400).send({
                    status: 'error',
                    err
                  })
                });
});

//            DELETE

router.delete('/:rollNumber',(req, res) => {
  let q = `DELETE FROM Student WHERE RollNumber = ${ req.params.rollNumber }`;
  selectQuery(q)
          .then(result => {
            res.send({
              status: 'OK',
              result
            });
          })
          .catch(err => {
            res.status(400).send({
              status: 'error',
              err
            })
          });
});

module.exports = router;
