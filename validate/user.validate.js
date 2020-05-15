

const db = require('../db')
module.exports.postCreate = function (req, res, next) {
    let name = req.body.name;
    // let email = req.body.email;

    let errors = []
    if (name.length > 30) {
        errors.push("Username không được quá 30 ký tự")
        res.render("error", {
          errors: errors
        });
        return 
    }
    next()
    
}