const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    lenguage: {type:String, required: true},
    level: {type:String, required: true},
    name: {type:String, required: true},
    lastname:{type:String, required: true},  
    email: {type:String, required: true},
    phone:{type:String, required: true}  
})

module.exports = mongoose.model('Student', studentSchema)