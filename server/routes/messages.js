var express = require('express');
var router = express.Router();
var db = require('../db');
var pg = db.getDb();


/* GET a specific message. */
router.get('/:messageId', function (req, res) {
  var id = req.params.messageId;
  console.log('requesting message ' + id);

  pg.one('SELECT message FROM examples WHERE did = $1', id)
  .then(function (data) {
    console.log('message data:', data.message); 
    let ret = { did: id, message: data.message };
    res.json(ret);
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send('Error retrieving Message ' + id);
  })
});

/* GET messages listing. */
router.get('/', function(req, res, next) {
  console.log('requesting messages');

  pg.any('SELECT did, message FROM examples')
  .then(function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send('Error retrieving Messages');
  })
});

module.exports = router;
