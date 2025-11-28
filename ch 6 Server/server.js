
const http =require('http');

const server =http.createServer((req,res)=>{
res.write("welcome my server...");
res.end("My First server");
})

server.listen(8001,(error)=>{
    if(error){
        console.log("Server is not started...!");
        return false;
    }
    console.log("Server is started....");
});

