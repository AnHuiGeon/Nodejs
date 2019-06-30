exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('<a href="/">로그인 필요</a>');
    // 하드코딩 한거시에양...!!권장 사항은 아닙니다.
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

//isAuthenticated()
//로그인 중이면 true, 아니면 false
// = 로그인 여부 파악 가능