var express = require('express');
var router = express.Router();
var db = require('../db');
var pg = db.getDb();

/* Create a new user. */
router.post('/create', function (req, res) {
  let msg = req.body;
  console.log('creating user: ' + JSON.stringify(msg));
});

module.exports = router;
