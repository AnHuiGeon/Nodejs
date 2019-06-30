const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';  // 환경이 개발자 환경인지 확인
const config = require('../config/config.json')[env]; // ../config/config.json에 가면 development가 있다.
const db = {};

const sequelize = new Sequelize(  // sequelize는 Sequelize의 객체가 된다.
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// 위 구문을 수행하면 db => {sequelize: sequelize, Sequilize: Sequelize}

db.User = require('./user')(sequelize, Sequelize);        // 화살표 함수 (sequelize, DataTypes) => {} 의 매개변수로 전달된다.
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
// db => {sequelize: sequelize, Sequelize : Sequelize, User : User, Post : Post, Hashtag : Hashtag}
    // => {sequelize, Sequelize, User, Post, Hashtag} 최신 문법으로 이렇게 가능하다.(이름이 같으면 한번만 써도 가능)

// 모델간의 관계설정
db.User.hasMany(db.Post);     // User모델은 Post모델을 여러개 가진다. => hasMany로 연결, 사용자는 여러 게시글을 가질수 있다.
db.Post.belongsTo(db.User);   // Post모델은 User모델을 하나만 가진다. => belongsTo로 연결, 시퀄라이즈는 Post모델에 userId컬럼을 추가, 게시글은 하나의 작성자만 가진다.

//중간 관계 테이블
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });  // Post모델은 Hashtag모델을 여러개 가진다. => belongsToMany로 연결
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });  // Hashtag모델은 Post모델을 여러개 가진다. => belongsToMany로 연결
// PostHashtag테이블을 통하여 서로 n:m 관계를 설정
// PostHashtag테이블은 시퀄라이즈가 분석하여 n:m관계일 시 자동 생성하는 중간 관계 테이블

db.User.belongsToMany(db.User, {    // User모델은 User모델을 여러개 가진다. => 팔로잉 기능 n:m
  foreignKey: 'followingId',    // 관계 테이블(PostHashtag)이 자동 생성되며 followerId와 followingId가 생김.
  as: 'Followers',              // join시 별명
  through: 'Follow',            // through옵션을 통해 Follow테이블을 만들어 User를 User와 n:m 관계설정
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',     // 관계 테이블(PostHashtag)이 자동 생성되며 followerId와 followingId가 생김.
  as: 'Followings',             // join시 별명
  through: 'Follow',            // through옵션을 통해 Follow테이블을 만들어 User를 User와 n:m 관계설정
});
module.exports = db;