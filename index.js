const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const reload = require('reload');
const { hash, compare } = require('bcrypt');
require('./db');
const User = require('./models/User');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/account', (req, res) => {
    // Da dang nhap vao thi show ra 'Bang dieu khien'
    // Rediect toi /signin
});

app.post('/signin', parser, async (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(() => res.send('Dang nhap thanh cong'))
    .catch(() => res.send('Dang nhap that bai'));
});

app.post('/signup', parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    User.signUp(email, password, name, phone)
    .then(() => res.send('Dang ky thanh cong'))
    .catch(() => res.send('Email da ton tai'));
});

app.listen(3000, () => console.log('Server started'));

reload(app);
