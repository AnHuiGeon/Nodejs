module.exports = (sequelize, DataTypes) => (
    sequelize.define('semester_purpose', {   // define() : db안에 테이블 정의한다?, define : 정의하다.
      purpose: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
    }, {
      timestamps: false,   // 작성 시간이 나타날것임.
      paranoid: true,
    })
  );
  