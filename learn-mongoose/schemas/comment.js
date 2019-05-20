const mongoose = require('mongoose');

const {Schema} = mongoose;  // 비구조화 할당

const {Types:{ObjectId}} = Schema;  // 비구조화 할당
//mongoose.Schema.Types.ObjectId; 비구조화 할당, Types안에 ObjectId

const commentSchema = new Schema({
    commenter: {
        type:ObjectId,
        required: true,
        ref: 'User' // reference의 약자 -> '참조'라는 뜻! 참조관계를 흉내냄
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
// comments 컬렉션