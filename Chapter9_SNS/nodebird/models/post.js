// 시퀄라이즈는 자동을 ID를 기본키로 연결해줌
// MySQL 테이블 컬럼 내용과 정확히 일치하는 모델을 만들어야 연결 가능함.
// 시퀄라이즈로 모델 정의 시 기본 형태 module.exports = (seqquelize, DataTypes) => {sequelize.define}
module.exports = (sequelize, DataTypes) => (
    sequelize.define(
        'post',     // posts 테이블과 연결
        {           // fields/columns 지정
        content: {
            type: DataTypes.STRING(140),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(200),    // image의 경로를 저장 할 것이다.
            allowNull: true,        // 사진은 반드시 있어야 하는 것이 아니므로 Null이어도 관계 없음.
        },
    }, {
        timestamps: true,   // => createdAt, updatedAt, deletedAt 컬럼도 생성됨
        paranoid: true,     // => createdAt, updatedAt, deletedAt 컬럼도 생성됨
    })
);