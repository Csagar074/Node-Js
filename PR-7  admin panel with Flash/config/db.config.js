const mongoose=require('mongoose');

const URI="mongodb://localhost:27017/Admin-Panel";

mongoose.connect(URI).then(()=>{
    console.log("MongoDB is Connected.....");
    
}).catch((err)=>{
    console.log("MongoDb is Failed.....");
    
});