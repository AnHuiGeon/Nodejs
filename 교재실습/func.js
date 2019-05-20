const {odd, even} = require('./var');
function checkOddOrEven(num) {
    if(num.length %2){
        console.log(odd);
    }else{
        console.log(even);
    }
}
module.exports = checkOddOrEven;