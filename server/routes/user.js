var express = require('express');
var router = express.Router();
var usermodel = require('../model/user');
var db = require('../db');
var pg = db.getDb();


/* Create a new user. */
router.post('/create', function (req, res) {
  let user = req.body;
  console.log('Creating user: ' + JSON.stringify(user));

  pg.one('SELECT COUNT(did) as cnt FROM users WHERE name = $1', user.name)
    .then(function (data) {
        if(data.cnt != 0) {
            console.log('User ' + user.name + ' already exists - ' + JSON.stringify(data));
            res.status(400).send('User ' + user.name + ' already exists');
        }
        else {
            let token = usermodel.newAuthToken(user.name);
            pg.none('INSERT INTO users VALUES (DEFAULT, $1, $2)',[user.name, token])
                .then(function (data) {
                    pg.one('SELECT did FROM users WHERE name = $1', user.name)
                    .then(function (data) {
                        console.log('Created user id ' + data.did + ', ' + user.name);
                        res.status(200).send('OK');
                    })
                })
        }
    })
    .catch(function (error) {
        console.log('ERROR:', error)
        res.status(400).send('Error creating user ' + user.name + ', ' + error);
    })
});

module.exports = router;
