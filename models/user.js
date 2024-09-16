const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
