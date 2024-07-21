const mongoose = require('mongoose'); 

var assignSchema = new mongoose.Schema({
    
    idStaff:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    idJob:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    dateStart:{
        type:Date,
        required:true,
    },
    dateEnd:{
        type:Date,
        required:true,
    },
    statusJob:{
        type:Boolean,
        default:false,
        required:true,
    },
});

module.exports = mongoose.model('assign', assignSchema);