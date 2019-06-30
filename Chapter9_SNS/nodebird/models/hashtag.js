// 시퀄라이즈는 자동을 ID를 기본키로 연결해줌
// MySQL 테이블 컬럼 내용과 정확히 일치하는 모델을 만들어야 연결 가능함.
// 시퀄라이즈로 모델 정의 시 기본 형태 module.exports = (sequelize, DataTypes) => {sequelize.define}
module.exports = (sequelize, DataTypes) => (
    sequelize.define(
        'hashtag',
        {
        title: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: true,   // => createdAt, updatedAt, deletedAt 컬럼도 생성됨
        paranoid: true,     // => createdAt, updatedAt, deletedAt 컬럼도 생성됨
    })
);