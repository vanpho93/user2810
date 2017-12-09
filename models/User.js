const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
