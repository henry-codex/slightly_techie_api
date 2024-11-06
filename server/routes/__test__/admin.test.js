// __tests__/admin.test.js
const request = require('supertest');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const adminRoutes = require('../server/routes/admin');

require('dotenv').config();

const app = express();
const jwtSecret = process.env.JWT_SECRET;

// Middleware setup
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
}));

app.use('/', adminRoutes);

// Connect to in-memory MongoDB for testing
beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe('Admin Routes', () => {
  let token;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('password', 10);
    const user = new User({ username: 'admin', password: hashedPassword });
    await user.save();

    token = jwt.sign({ userId: user._id }, jwtSecret);
  });

  it('should render the admin login page', async () => {
    const res = await request(app).get('/admin');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Admin');
  });

  it('should login the admin user', async () => {
    const res = await request(app)
      .post('/admin')
      .send({ username: 'admin', password: 'password' });
    expect(res.statusCode).toEqual(302);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should render the admin dashboard', async () => {
    const res = await request(app)
      .get('/dashboard')
      .set('Cookie', `token=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Dashboard');
  });

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/add-post')
      .set('Cookie', `token=${token}`)
      .send({ title: 'Test Post', body: 'This is a test post.' });
    expect(res.statusCode).toEqual(302);
    const post = await Post.findOne({ title: 'Test Post' });
    expect(post).toBeDefined();
  });

  it('should edit a post', async () => {
    const post = new Post({ title: 'Edit Post', body: 'This is a post to edit.' });
    await post.save();

    const res = await request(app)
      .put(`/edit-post/${post._id}`)
      .set('Cookie', `token=${token}`)
      .send({ title: 'Edited Post', body: 'This post has been edited.' });
    expect(res.statusCode).toEqual(302);

    const updatedPost = await Post.findById(post._id);
    expect(updatedPost.title).toEqual('Edited Post');
  });

  it('should delete a post', async () => {
    const post = new Post({ title: 'Delete Post', body: 'This post will be deleted.' });
    await post.save();

    const res = await request(app)
      .delete(`/delete-post/${post._id}`)
      .set('Cookie', `token=${token}`);
    expect(res.statusCode).toEqual(302);

    const deletedPost = await Post.findById(post._id);
    expect(deletedPost).toBeNull();
  });

  it('should logout the admin user', async () => {
    const res = await request(app).get('/logout');
    expect(res.statusCode).toEqual(302);
    expect(res.headers['set-cookie']).toBeDefined();
  });
});