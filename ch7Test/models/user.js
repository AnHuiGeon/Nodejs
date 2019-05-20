module.exports =    //화살표 함수가 외부에서 사용됨
(sequelize, DataTypes) => {
    return sequelize.define('user', {   //users테이블 연결 모델 정의함
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    { timestamps: false, }  //define 메서드
                            //true: createdAt, updateAt 자동으로 컬럼추가됨.
    );
}