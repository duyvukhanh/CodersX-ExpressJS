// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require('./db')
const shortid = require("shortid");
const bookRoute = require("./routes/book.route")
const userRoute = require("./routes/user.route")
const transactionRoute = require("./routes/transactions.route")
const cookieParser = require('cookie-parser')


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// our default array of dreams
app.use(express.static('public'));
app.use(cookieParser())
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.cookie('cookie',0)
  res.render("index", {})
});

app.use('/books', bookRoute)
app.use('/users', userRoute)
app.use('/transactions', transactionRoute)


app.listen(8080, () => {
  console.log("Server listening on port " + 8080);
});