const mongoose =require('mongoose');

const URI=("mongodb://localhost:27017/movie System")

mongoose.connect(URI)
.then(()=>{
    console.log("Mogodb is Connnect");

})
.catch((err)=>{
    console.log("Mogodb is Not Connected.....",err);
} )
.finally(()=>{
    console.log("Finally .....");
})