var express = require('express');
var router = express.Router();
var usermodel = require('../model/user');
var db = require('../db');
var pg = db.getDb();

/* Create a new user. */
router.post('/create', function (req, res) {
  let user = req.body;
  console.log('creating user: ' + JSON.stringify(user));
  let token = usermodel.newAuthToken(user.user_id);

  pg.one('SELECT did FROM users WHERE name = $1', user.name)
    .then(function (data) {
        res.status(409).send('User name ' + user.name +' already in use.');
    })
    .catch(function (error) {
      /* Ignore */
    })
   .then( function(data) {
      pg.none('INSERT INTO users VALUES (DEFAULT, $1, NULL)',user.name)
           .catch(function (error) {
                console.log('ERROR:', error)
                res.send('Error creating user ' + user.name + ', ' + error);
           })
    })
});

module.exports = router;
