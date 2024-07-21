const mongoose = require('mongoose'); 

var billSchema = new mongoose.Schema({
    idCustomer:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    idStaff:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    dateBuy:{
        type:Date,
        require:true
    },
    nameService:{
        type:String,
        require:true
    },
    nameCustomer:{
        type:String,
        require:true
    },
    nameStaff:{
        type:String,
        require:true
    },
    totalAmout:{
        type:Number,
        require:true
    },
    status:{
        type:Boolean,   
        default:false
    },
    numberphone:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    }
    
});

module.exports = mongoose.model('bill', billSchema);