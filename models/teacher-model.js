const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: {type:String, required: true},
    description:{type:String, required: true},
    avatar:{type:Buffer}  
})

module.exports = mongoose.model('Teacher', teacherSchema)