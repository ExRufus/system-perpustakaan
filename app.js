const express = require("express");
const router = require("./routes/router");
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require("./libs/passport");

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Welcome to my on site")
})

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running on port http://localhost:${PORT}`)
})