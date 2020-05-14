const db = require('../db')


module.exports.isAdmin = function(req, res, next) {
    let isAdmin = false
    let user = db.get('users').find({ id : req.cookies.userId }).value();
    if (user) {
        isAdmin = user.isAdmin
    }
    next()
}
  