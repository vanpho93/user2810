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

app.post('/signin', parser, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.send('Kiem tra lai thong tin dang nhap.');
        const same = await compare(password, user.password);
        if (same) return res.send('Dang nhap thanh cong.');
        res.send('Kiem tra lai thong tin dang nhap.');
    } catch (err) {
        res.send(err);
    }
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
