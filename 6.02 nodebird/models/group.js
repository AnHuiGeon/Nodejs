module.exports = (sequelize, DataTypes) => (
    sequelize.define('group', {   // define() : db안에 테이블 정의한다?, define : 정의하다.
      name: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      introduce: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
      license: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING(200),
        allowNull: true,
      }
    }, {
      timestamps: false,   // 작성 시간이 나타날것임.
      paranoid: true,
    })
  );

  //조원 정보