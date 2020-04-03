var express = require('express');
var router = express.Router();
var db = require('../db');
var pg = db.getDb();


/* GET a specific message. */
router.get('/:messageId', function (req, res) {
  let id = req.params.messageId;
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
    res.send('Error retrieving message ' + id);
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
    res.send('Error retrieving messages');
  })
});

/* POST a new message. */
router.post('/create', function (req, res) {
  let msg = req.body;
  console.log('creating message: ' + JSON.stringify(msg));
  pg.none('INSERT INTO messages VALUES (DEFAULT, CURRENT_TIMESTAMP, $1, $2)', [msg.user_id, msg.content])
  .then(function (data) {
    res.send('OK');
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send('Error creating message');
  })
});

/* DELETE a specific message. */
router.get('/delete/:messageId', function (req, res) {
  let id = req.params.messageId;
  console.log('deleting message ' + id);
  pg.none('DELETE FROM messages WHERE did = $1', id)
  .then(function (data) {
    res.send('OK');
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send('Error deleting message ' + id);
  })
});

module.exports = router;
