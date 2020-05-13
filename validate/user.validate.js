

const db = require('../db')
module.exports.postCreate = function (req, res, next) {
    let name = req.body.name;
    let errors = []
    if (name.length < 30) {
        db.get('users').push(req.body).write()
        res.redirect('/users')
    } else {
        errors.push("Username không được quá 30 ký tự")
        res.render("error", {
          errors: errors
        });
    }
    next();
}