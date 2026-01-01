const mongoose=require('mongoose');

mongoose.connect(URI).then(()=>{
    console.log("Mongodb is Connected....");
    
}).catch((err)=>{
    console.log("Mongodb is Failed....",err);
    
})