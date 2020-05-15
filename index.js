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
const loginRoute = require("./routes/login.route")

const transactionRoute = require("./routes/transactions.route")
const cookieParser = require('cookie-parser')
const authRequired = require('./middlewares/auth')
const isAdmin = require('./middlewares/isAdmin')


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// our default array of dreams
app.use(express.static('public'));
app.use(cookieParser())
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/",isAdmin.isAdmin, (req, res) => {
  res.cookie('cookie',0)
  res.render("index", {})
}); 


app.get("/cookie", (req, res) => {
  let count =  parseInt(req.cookies.cookie)
  count ++
  res.cookie('cookie',count)
  console.log(req.cookies)
  res.send("Cookie counted in console")
});


app.use('/books',authRequired.requireAuth, bookRoute)
app.use('/users',authRequired.requireAuth,  userRoute)
app.use('/transactions',authRequired.requireAuth, transactionRoute)
app.use('/login', loginRoute)


app.listen(8080, () => {
  console.log("Server listening on port " + 8080);
});