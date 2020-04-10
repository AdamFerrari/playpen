const jwt  = require('jsonwebtoken')

module.exports = {
    newAuthToken
}

function newAuthToken(user_name) {
    return jwt.sign({user_name: user_name},
        'playpensecret', {expiresIn: "7 days"});
}
