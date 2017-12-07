const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const reload = require('reload');
const { hash, compare } = require('bcrypt');
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
    const { email, password } = req.body;
    User.findOne({ email })
    .then(user => {
        if (!user) return res.send('Kiem tra lai thong tin dang nhap.');
        return compare(password, user.password)
    })
    .then(same => {
        if (same) return res.send('Dang nhap thanh cong.');
        res.send('Kiem tra lai thong tin dang nhap.');
    })
    .catch(err => res.send(err));
});

app.post('/signup', parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    hash(password, 8)
    .then(encrypted => {
        const user = new User({ email, password: encrypted, name, phone });
        return user.save()
    })
    .then(() => res.send('sign up sucessfully'))
    .catch(err => res.send(err));
});

app.listen(3000, () => console.log('Server started'));

reload(app);
