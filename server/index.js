const express = require('express');
const bodyParser = require('body-parser');
const core = require('cors');
const session = require('express-session');
const passport = require('passport');

const auth = require('./routes/auth');
require('./database/db');

// Express Middleware
const app = express();

// CORS Middleware
app.use(core());

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express-session Middleware
app.use(session({
  secret: 'abc123',
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', auth);

// Port
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
