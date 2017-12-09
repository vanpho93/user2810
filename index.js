const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const session = require('express-session');
const reload = require('reload');
const { hash, compare } = require('bcrypt');
require('./db');
const User = require('./models/User');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000000 },
    rolling: true
}));

app.get('/', (req, res) => res.render('home'));

const preventReSignIn = (req, res, next) => {
    if (req.session.daDangNhap) return res.redirect('/account');
    next();    
}

const mustSignIn = (req, res, next) => {
    if (!req.session.daDangNhap) return res.redirect('/signin');
    next();    
}

app.get('/signin', preventReSignIn, (req, res) => {
    res.render('signin');
});

app.get('/signup', preventReSignIn, (req, res) => {
    res.render('signup');
});

app.get('/account', mustSignIn, (req, res) => {
    res.send('Bang dieu khien');
});

app.post('/signin', preventReSignIn, parser, async (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(() => {
        req.session.daDangNhap = true;
        res.send('Dang nhap thanh cong');
    })
    .catch(() => res.send('Dang nhap that bai'));
});

app.post('/signup', preventReSignIn, parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    User.signUp(email, password, name, phone)
    .then(() => res.send('Dang ky thanh cong'))
    .catch(() => res.send('Email da ton tai'));
});

app.listen(3000, () => console.log('Server started'));

reload(app);
