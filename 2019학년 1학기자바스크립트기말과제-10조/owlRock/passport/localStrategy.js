const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    // email == name='email', password == name='password'
    // passport는 기본적으로 username과 password를 갖고 있음.
    // 이것을 *Field를 해서 custome할 수 있다.
    // 없어도 상관은 없음. 대신 pug쪽 name=""란도 이름을 같게할것.
  }, async (email, password, done) => {
    try {
      const exUser = await User.find({ where: { email } });
      // email이 일치하는 user정보가 있는지 조회
      if (exUser) { // 일치하는 값이 있으면
        const result = await bcrypt.compare(password, exUser.password);
        // 입력한 password와 DB의 password를 복호화해 비교한다.
        // compare = 복호화
        if (result) { // 복호화 후 암호가 일치하면 result는 null이 아니다.
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
