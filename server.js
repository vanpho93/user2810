const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000000 },
    rolling: true
}));

app.get('/muave', (req, res) => {
    req.session.daMuaVe = true;
    res.send('Da mua ve');
});

app.get('/vaorap', (req, res) => {
    if (!req.session.daMuaVe) return res.send('Ban phai mua ve');
    res.send('Moi xem phim');
});

app.listen(3000, () => console.log('Server started!'));
