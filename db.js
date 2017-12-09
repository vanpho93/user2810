const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mean2810', { useMongoClient: true })
.then(() => console.log('Connected'))
.catch(err => console.log(err.message));
