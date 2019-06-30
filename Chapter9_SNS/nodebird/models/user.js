// 시퀄라이즈는 자동을 ID를 기본키로 연결해줌
// MySQL 테이블 컬럼 내용과 정확히 일치하는 모델을 만들어야 연결 가능함.
// 시퀄라이즈로 모델 정의 시 기본 형태 module.exports = (seqquelize, DataTypes) => {sequelize.define}
module.exports = (sequelize, DataTypes) => (        // p60, add4 참고
    sequelize.define(
    'user',    // users 테이블과 연결
    {          // fildes/column 지정
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,        // 널 값을 허용한다.
            unique: true,
        },
        nick: {
            type: DataTypes.STRING(50),
            allowNull: false,   // 널 값을 허용하지 않는다.
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,    // 널 값을 허용한다.
        },
        provider: {     // SNS 로그인을 하였을 경우 저장, provider => local이면 로컬 로그인 | kakao면 카카오 로그인
            type: DataTypes.STRING(10),
            allowNull: false,           // 널 값을 허용하지 않는다.
            defaultValue: 'local',      // 기본값 : 'local'(기본적으로 로컬 로그인이라 가정)
        },
        snsId: {        // SNS 로그인을 하였을 경우 저장
            type: DataTypes.STRING(30),
            allowNull: true,    // 널 값을 허용한다.
        },
    }, {
        timestamps: true,   // => createdAt, updatedAt, deletedAt 컬럼도 생성됨
        paranoid: true,     // => createdAt, updatedAt, deletedAt 컬럼도 생성됨
    })
);