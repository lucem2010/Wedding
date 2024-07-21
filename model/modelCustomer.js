const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var modelCustomer = new mongoose.Schema({
    nameCustomer:{
        type:String,
        required:true,
    },
   
    numberphone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }
   
});

//Export the model
module.exports = mongoose.model('customer', modelCustomer);