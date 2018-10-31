var express = require('express');
var router = express.Router();
var { selectQuery, insertQuery } = require('../models/query');

//               GET 

router.get('/',async function(req, res) {
  let q = `SELECT * FROM Institute ORDER BY InstituteId`;
  let institutes = await selectQuery(q);
  res.send(institutes);
});

router.get('/:id',async (req, res) => {
  let q = `SELECT * FROM Institute WHERE InstituteId = '${ req.params.id }'`;
  let institute = await selectQuery(q);
  res.send(institute[0]);
});

router.get('/:id/program',async (req, res) => {
  let q = `SELECT * FROM Program WHERE InstituteId = '${ req.params.id }'`;
  let programs = await selectQuery(q);
  res.send(programs);
});

router.get('/:id/program/:name',async (req, res) => {
  let q = `SELECT * FROM Program WHERE InstituteId = '${ req.params.id }' AND Name = '${ req.params.name }'`;
  let program = await selectQuery(q);
  res.send(program[0]);
});

//              POST

router.post('/', (req, res) => {
    let q = `INSERT INTO Institute SET ?`;
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

router.post('/:id/program', (req, res) => {
    let q = `INSERT INTO Program SET ?`;
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

router.put('/:id', (req, res) => {
    let q = `UPDATE Institute SET ? WHERE InstituteId = '${ req.params.id }'`;
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

router.put('/:id/program/:name', (req, res) => {
    let q = `UPDATE Program SET ? WHERE InstituteId = '${ req.params.id }' AND Name = '${ req.params.name }'`;
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

router.delete('/:id',(req, res) => {
    let q = `DELETE FROM Institute WHERE InstituteId = '${ req.params.id }'`;
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

router.delete('/:id/program/:name', (req, res) => {
    let q = `DELETE FROM Program WHERE InstituteId = '${ req.params.id }' AND Name = '${ req.params.name }'`;
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
