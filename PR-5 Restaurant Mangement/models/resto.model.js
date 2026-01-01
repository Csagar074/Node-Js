const mongoose=require('mongoose');
const resto = require('../routes/resto.route');

const restoSchema=mongoose.Schema({
    
  resto_name: {
    type: String,
    required: true
  },

  resto_owener: {
    type: String,
    required: true
  },

  resto_email: {
    type: String,
    required:true
  },
   resto_password: {
    type: String,
    required:true
  },
  contact_number: {
    type: Number,
    required: true
  },

  resto_address: {
    type: String,
    required: true
}})

module.exports=mongoose.model("Restaurant",restoSchema,"Restaurant");
