const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    color: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = User = mongoose.model('User', UserSchema);
