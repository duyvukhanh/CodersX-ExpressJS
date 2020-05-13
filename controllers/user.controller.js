const db = require('../db')
const shortid = require('shortid')

module.exports.index = function(req, res) {
  res.render("users", {
        users: db.get('users').value()
    })
}

module.exports.delete = function (req, res) {
    let id = req.params.id
    db.get('users').remove({ id: id }).write()
    res.redirect('/users')
}

module.exports.update = function (req, res) {
    let id = req.params.id
    res.render("user-update", {
        user: db.get('users').find({ id: id }).value()
    })
}

module.exports.postUpdate = function (req, res) {
    let id = req.params.id
    let newUserName = req.body.newUserName;
    let newPassword = req.body.newPassword;
    let newPhoneNumber = req.body.newPhoneNumber;

    db.get('users').find({ id: id }).assign({ name: newUserName }).write()
    db.get('users').find({ id: id }).assign({ password: newPassword }).write()
    db.get('users').find({ id: id }).assign({ phoneNumber: newPhoneNumber }).write()

    res.redirect('/users')
}

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate()
    
}