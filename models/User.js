const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true }
});

const UserModel = mongoose.model('User', userSchema);

class User extends UserModel {
    static async signUp(email, password, name, phone) {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name, phone });
        return user.save()
    }

    static async signIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User khong ton tai');
        const same = await compare(password, user.password);
        if (!same) throw new Error('Mat khau khong hop le');
    }
}

module.exports = User;
