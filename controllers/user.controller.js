const bcrypt = require('bcryptjs');
const saltRounds = 10;

const db = require('../db')
const shortid = require('shortid')

module.exports.index = function (req, res) {
    let user = db.get("users").find({ id: req.signedCookies.userId }).value()
    res.render("users", {
        users: db.get('users').value(),
        isAdmin: user.isAdmin
    })
}

module.exports.delete = function (req, res) {
    let id = req.params.id
    db.get('users').remove({ id: id }).write()
    res.redirect('/users')
}

module.exports.update = function (req, res) {
    let id = req.params.id
    let user = db.get('users').find({ id: id }).value()
    res.render("user-update", {
        user: db.get('users').find({ id: id }).value(),
        isAdmin: user.isAdmin
    })
}

module.exports.postUpdate = function (req, res) {
    let id = req.params.id
    let newUserName = req.body.newUserName;
    let newPassword = req.body.newPassword;
    let newPhoneNumber = req.body.newPhoneNumber;
    let newEmail = req.body.newEmail;

    db.get('users').find({ id: id }).assign({ name: newUserName }).write()
    db.get('users').find({ id: id }).assign({ password: newPassword }).write()
    db.get('users').find({ id: id }).assign({ phoneNumber: newPhoneNumber }).write()
    db.get('users').find({ id: id }).assign({ email: newEmail }).write()

    res.redirect('/users')
}

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate()
    req.body.isAdmin = false
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            req.body.password = hash
            db.get('users').push(req.body).write()
        });
    });

    res.redirect('/users')
}