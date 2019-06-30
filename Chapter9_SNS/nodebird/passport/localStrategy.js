const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => { //localStrategy.js -> index.js -> app.js
    passport.use(
        new LocalStrategy({
            // 로그인을 위한 사용자의 입력정보 // req.body.email, req.body.passport
                usernameField: 'email',     // layout.pug의 입력창 참고, 28단락의 input태그의 name='eamil'이다.
                passwordField: 'password'   // layout.pug의 입력창 참고, 31단락의 input태그의 name='password'이다.
            },
            // layout.pug의 form태그 안에 input태그의 name을 username, password로 했을 경우
            // callback함수만 정의해도 된다.
            async (email, password, done) => {  // 로그인 처리하는 함수, 매개변수이므로 이름을 바꿔도 상관없다.
                // done: p.372 passport.authenticate()와 관련되어 있다.
                try{
                    const exUser = await User.findOne({ where: { email } }); // 위 매개변수를 where절에 담아서 찾는다.
                    if(exUser) {    // exUser: true => 회원가입된 유저임을 확인
                        const result = await bcrypt.compare(password, exUser.password); // 비밀번호 일치하는지 검사.
                        if(result) {
                            done(null, exUser); // 아이디 패스워드가 인증된 경우
                        }else {
                            done(null, false, { message: '비번 불일치' });
                        }
                    }else {
                        done(null, false, { message: '가입안된 유저임'});
                    }
                }catch(error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};