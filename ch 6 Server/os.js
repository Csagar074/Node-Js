const os=require('os');

console.log("1");

console.log("Hello world");

let len = os.cpus().length;
console.log(`cpu workiers : ${len}`);

console.log("2");