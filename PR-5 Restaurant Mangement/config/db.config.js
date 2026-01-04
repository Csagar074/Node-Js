const mongoose=require('mongoose');

const URI="mongodb://localhost:27017/Resto-Mangement";
mongoose.connect(URI).then(()=>{
    console.log("Mongodb is Connected....");
    
}).catch((err)=>{
    console.log("Mongodb is Failed....",err);
    
})