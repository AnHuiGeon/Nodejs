//require는 import와 같다고 보면 된다.
const{odd,even} = require('./var');
const checkNumber = require('./func');
function jintobegi(Jjang){
    if(Jjang %2){
        console.log(odd);
    }else{
        console.log(even);
    }
}
console.log(jintobegi(6));
console.log(checkNumber('장준혁'));
