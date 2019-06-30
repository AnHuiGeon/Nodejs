const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true, // 필수, 반드시 요구됨
        unique: true,    // 유일한 값
    },
    age: {
        type: Number,
        required: true,
    },
    married: {
        type: Boolean,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
// user 컬렉션