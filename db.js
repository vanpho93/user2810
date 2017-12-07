const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mean2810', { useMongoClient: true })
.then(() => console.log('Connected'))
.catch(err => console.log(err.message));

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
