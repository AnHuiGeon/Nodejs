exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {     // isAuthenticated(); passport모듈이 제공해주는 함수, true: 로그인중, false: 로그아웃
        next(); // 위 결과가 성공하면 => 다음 미들웨어를 실행하라 라는 의미.
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {    // 로그인 중이면 next(); 로그인
        next(); // 로그인 중이면 => 다음 미들웨어를 실행하라.
    } else {
        res.redirect('/');  // 원래 페이지로 이동한다. : GET '/' 요청을 한다.
    }
}