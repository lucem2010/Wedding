const mongoose = require('mongoose'); 

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    numberPhone:{
        type:String,
        required:true
    },
    
   status:{
     type: Boolean,
      default:false,
      require:true
   }
});

module.exports = mongoose.model('user', userSchema);