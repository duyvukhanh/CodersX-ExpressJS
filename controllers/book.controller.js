const db = require('../db')
const shortid = require('shortid')

module.exports.index = function (req, res) {
    let user = db.get("users").find({ id: req.signedCookies.userId }).value()
    res.render("book", {
        books: db.get('books').value(),
        isAdmin : user.isAdmin
    })
}

module.exports.delete = function (req, res) {
    let id = req.params.id
    db.get('books').remove({ id: id }).write()
    res.redirect('/books')
}


module.exports.update = function (req, res) {
    let id = req.params.id
    res.render("update", {
        book: db.get('books').find({ id: id }).value()
    })
}


module.exports.postUpdate = function (req, res) {
    let id = req.params.id
    let newName = req.body.newName;
    db.get('books').find({ id: id }).assign({ name: newName }).write()
    res.redirect('/books')
}


module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate()
    db.get('books').push(req.body).write()
    res.redirect('/books')
}