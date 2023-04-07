const express = require("express");
const router = require("./routes/router");
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require("./libs/passport");
const passportJwt = require("./libs/passport-jwt");

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

//local strategy
app.use(passport.initialize());
app.use(passport.session());

//JWT
app.use(passportJwt.initialize());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running on port http://localhost:${PORT}`)
})