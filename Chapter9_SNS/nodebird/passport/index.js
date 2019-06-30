const { User } = require('../models');  // 비 구조화 할당
const local = require('./localStrategy');   // 로컬전략 p.373
const kakao = require('./kakaoStrategy');   // 카카오전략 p.375

module.exports = (passport) => {
    passport.serializeUser((user, done) => {    // 로그인 시도시 한번만 호출 된다. 1회 호출. user: 로그인 한 사용자의 정보, serialize: 직렬화
        done(null, user.id);    // null : 에러가 발생하지 않을거다~ 그래서 null 이다. user객체 중에서 user.id로 id만 저장한다.
    });
    passport.deserializeUser((id, done) => {
        // 매번 요청마다 deserialize가 호출되며 serialize로 직렬화 된 것을 비직렬화 한다.
        // passport.session()미들웨어가 호출
        // serializeUser에서 저장한 user.id로 사용자 정보를 조회
        // 조회한 사용자 정보는 req.user객체에 저장해준다.
        // 로그인 한 후에 모든 요청에 대해 호출.
        User.findOne({
            where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        })    // User 테이블에서 where절로 찾는다.
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    local(passport);    // passport를 이용하여 로그인 처리를 하도록 설정한다.
    kakao(passport);
};