const db = require('../db')
const shortid = require('shortid')

module.exports.index = function(req, res) {
  let transactions = db.get("transactions").value()
  let transactionsTransform = []
  for  (let transaction of transactions) {
    let transactionTransform = {}
    let userName = db.get("users").find({ id: transaction.userId }).value().name;
    let bookName = db.get("books").find({ id: transaction.bookId }).value().name;
    let transactionStatus = transaction.isComplete
    transactionTransform.id = transaction.id
    transactionTransform.userName = userName
    transactionTransform.bookName = bookName
    transactionTransform.isComplete = transactionStatus
    transactionsTransform.push(transactionTransform)
  }
  res.render("transaction", {
    users: db.get("users").value(),
    books: db.get("books").value(),
    transactions: transactionsTransform
  });
}

module.exports.postCreate = function(req, res) {
  let transactionsId = shortid.generate();
  let userName = req.body.userName;
  let bookName = req.body.bookName;
  let user = db.get("users").find({ name: userName }).value();
  let book = db.get("books").find({ name: bookName }).value();
  let transaction = {
    id: transactionsId,
    userId: user.id,
    bookId: book.id,
    isComplete : false
  };
  db.get("transactions")
    .push(transaction)
    .write();
  res.redirect("/transactions");
}

module.exports.complete = function(req, res) {
  let id = req.params.id;
  let transactions = db.get('transactions')
  let errors = []
  let isExist = false

  for (let transaction of transactions) {
    if (transaction.id == id) {
      console.log(id)
      isExist = true
    }
  }
  if (isExist) {
    transactions.find({ id: id }).assign({ isComplete : true }).write()
    res.redirect("/transactions");
  } else {
    errors.push("ID khong ton tai")
    res.render("error", {
      errors: errors
    });
  }
  
}