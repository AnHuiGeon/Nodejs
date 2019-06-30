const mongoose = require("mongoose");

module.exports = () => {
    const connect = () => { // connect 정의
        if(process.env.NODE_ENV !== 'production'){  // production이 아닐때(즉, development일 때) 라는 환경설정을 한다.
            mongoose.set('debug', true);
        }
        mongoose.connect(   //실제 mongodb와 연결은 이곳에서 이루어진다.
            // 'mongodb://이름:비번@localhost:27017/admin', // 연결 uri, url과 동일한 방식
            'mongodb://nodejs:node@localhost:27017/admin',
            {dbName: 'nodejs'}, // 옵션, 없으면 mongos/bin 프롬프트에서 use nodejs를 해야함.
            (error) => {    // callback함수, 이 callback함수는 connect()실행이 완료되면 실행한다.(이벤트리스너라고도 할 수 있겠다.)
                if(error){
                    console.log('몽고디비 연결 시도중 에러' + error);
                }else{
                    console.log('몽고디비 연결 성공');
                }
            }
        );
    };
    connect();  // connect 호출

    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect();
    });

    require('./user');  // p.329
    require('./comment');   // p.330
    /* (() => {

    })(); */    //함수를 정의하면서 곧바로 호출 / 1회성
};