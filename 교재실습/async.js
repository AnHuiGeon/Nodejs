const fs = require('fs');

console.log('Start');
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1st', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('2st', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('3st', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('4st', data.toString());W
});
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('5st', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('6st', data.toString());
});
console.log('end');