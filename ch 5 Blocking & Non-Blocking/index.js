const fs=require('fs');

// Blocking & Non-Blocking program 

console.log("1");

// sync 
fs.writeFileSync("./text.txt","Hello Node js");

console.log("create file");

// Async 

const result=fs.readFile("./text.txt","utf-8",(err)=>{
    if(err){
        console.log(result);
    }
});
console.log("2");
// console.log("3");