const fs = require("fs");

// sync 
fs.writeFileSync("./demo.txt", "Hello World");
console.log("create file");

// Async 

fs.writeFile("./demo.txt","Hello log..."),(err)=>{
    if(err){
        console.log(err);
    }
}

sync 
fs.appendFileSync("./demo.txt","Hello Node js");
fs.appendFileSync("./demo.txt",new Date().toLocaleString()+"/n");

// Async 
fs.appendFile("./demo.txt",new Date().toLocaleString(),"/n",(arr)=>{

});

// sync 
const result =fs.readFileSync("./demo.txt","utf-8");

console.log(result);

// Async 

fs.readFile("./demo.txt","utf-8",(err,result)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Async Read :",result);
    }
});

// sync 
fs.unlinkSync("./demo.txt");






