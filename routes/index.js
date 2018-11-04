var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.send("<h1>Home Page</h1>")
});

module.exports = router;
