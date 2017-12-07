const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const reload = require('reload');
const User = require('./db');

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

app.post('/signin', parser, (req, res) => {
    res.send('sign in route');
});

app.post('/signup', parser, (req, res) => {
    res.send('sign up route');
});

app.listen(3000, () => console.log('Server started'));

reload(app);
