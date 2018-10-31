var express = require('express');
var router = express.Router();
var { selectQuery, insertQuery } = require('../models/query');

//               GET 

router.get('/',async function(req, res) {
    let q = `SELECT * FROM ProgramChosen ORDER BY StudentRollNumber`;
    let programs = await selectQuery(q);
    res.send(programs);
});

router.get('/rollNumber/:rollNumber',async (req, res) => {
    let q = `SELECT * FROM ProgramChosen WHERE StudentRollNumber = '${ req.params.rollNumber }'`;
    let programs = await selectQuery(q);
    res.send(programs);
});

router.get('/:id',async (req, res) => {
    let q = `SELECT * FROM ProgramChosen WHERE InstituteId = '${ req.params.InstitudeId }'`;
    let programs = await selectQuery(q);
    res.send(programs);
});

router.get('/:id/:name', (req, res) => {
    let q = `SELECT * FROM ProgramChosen WHERE InstituteId = '${ req.params.InstitudeId }' AND ProgramName = '${ req.params.name }'`;
    let programs = await selectQuery(q);
    res.send(programs);
});

router.get('/:id/:name/:rollNumber', (req, res) => {
    let q = `SELECT * FROM ProgramChosen WHERE InstituteId = '${ req.params.InstitudeId }' AND ProgramName = '${ req.params.name }' AND StudentRollNumber = '${ req.params.rollNumber }`;
    let program = await selectQuery(q);
    res.send(program[0]);
});

//              POST

router.post('/', (req, res) => {
  let q = `INSERT INTO ProgramChosen SET ?`;
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

router.put('/:id/:name/:rollNumber', (req, res) => {
  let q = `UPDATE ProgramChosen SET ? WHERE InstituteId = '${ req.params.InstitudeId }' AND ProgramName = '${ req.params.name }' AND StudentRollNumber = '${ req.params.rollNumber }`;
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

router.delete('/:id/:name/:rollNumber',(req, res) => {
  let q = `DELETE FROM ProgramChosen WHERE InstituteId = '${ req.params.InstitudeId }' AND ProgramName = '${ req.params.name }' AND StudentRollNumber = '${ req.params.rollNumber }`;
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
