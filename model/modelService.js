const mongoose = require('mongoose'); 

var serviceSchema = new mongoose.Schema({
    nameService:{
        type:String,
        required:true,
    },
    statusService:{
        type:Boolean,
        default:false,
        required:true
    },
    descriptionService:{
        type:String,
        required:true,
    },
    priceService:{
        type: Number,
        required:true,
    },
    img:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('service', serviceSchema);