const db = require('../db')


module.exports.isAdmin = function(req, res, next) {
    // let isAdmin
    let user = db.get('users').find({ id : req.cookies.userId }).value();
    if (user) {
        res.render('index', {
            isAdmin : user.isAdmin
        })
        return
    } else {
        res.render('index', {
            isAdmin : false
        })
        return
    }
    res.redirect('/')

}
  