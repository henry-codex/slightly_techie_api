// __tests__/app.test.js
const request = require('supertest');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('../server/config/db');
const { isActiveRoute } = require('../server/helpers/routeHelpers');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('cookie-parser')());
app.use(require('method-override')('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));

app.use(express.static('public'));

// Templating Engine
app.use(require('express-ejs-layouts'));
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('../server/routes/main'));
app.use('/', require('../server/routes/admin'));

describe('Express App', () => {
  it('should respond with a 200 status code for the home route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should respond with a 200 status code for the admin route', async () => {
    const res = await request(app).get('/admin');
    expect(res.statusCode).toEqual(200);
  });

  // Add more tests as needed
});