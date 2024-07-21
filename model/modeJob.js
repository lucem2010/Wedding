const mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    nameJob:{
        type:String,
        required:true,
    },
    descriptionJob:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('job', jobSchema);