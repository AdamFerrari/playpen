const jwt  = require('jsonwebtoken')

function newAuthToken(user_id) {
    return jwt.sign(user_id, 'playpensecret', {expiresIn: "7 days"})
}
