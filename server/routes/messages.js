var express = require('express');
var router = express.Router();
var db = require('../db');
var pg = db.getDb();


/* GET a specific message. */
router.get('/:messageId', function (req, res) {
  var id = req.params.messageId;
  console.log('requesting message ' + id);

  pg.one('SELECT did, created_at, user_id, content FROM messages WHERE did = $1', id)
  .then(function (data) {
    console.log('message data:', data.message); 
    let ret = {
         did: data.did,
         created_at: data.created_at,
         user_id: data.user_id,
         content: data.content
    };
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

  pg.any('SELECT did, created_at, user_id, content FROM messages')
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
