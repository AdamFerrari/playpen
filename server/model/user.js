var db = require('../db');
var pg = db.getDb();

function newAuthToken(user_id)
    const token =  jwt.sign(user_id, 'playpensecret', {expiresIn: "7 days"})

/* save the token */
    return token
}
