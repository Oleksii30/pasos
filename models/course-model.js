const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    lenguage: {type:String, required: true},
    level: {type:String, required: true},
    price:{type:String, required: true},  
    schedule: {type:String, required: true},
    
})

module.exports = mongoose.model('Course', courseSchema)