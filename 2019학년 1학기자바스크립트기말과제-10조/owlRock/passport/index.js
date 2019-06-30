const local = require('./localStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  // passportConfig(passport)로 의해 passport 사용 가능
  passport.serializeUser((user, done) => {
    // 사용자 정보 객체를 세션에 아이디로 저장
    // req.session객체에 어떤 데이터를 저장할지 선택
    done(null, user.id);
    // 매개변수로 user를 받아 done함수에 두번째 인자로 user.id 넘김 첫번째 인자는 에러 발생 시 사용
  });

  passport.deserializeUser((id, done) => {
    // 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것
    // 매 요청 시 실행됨 passport.session() 미들웨어가 이 메서드를 호출
    User.find({ where: { id } })
    // 위에서 저장했던 아이디를 받아 DB에서 사용자 정보 조회,
    // req.user를 통해 로그인한 사용자의 정보를 가져올 수 있음
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  local(passport);
};