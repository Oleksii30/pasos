const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: {type:String, required: true},
    description:{type:String, required: true},
    avatar:{
        first:{type:String, required: true},
        second:{type:String, required: true},
        third:{type:String, required: true},
    },    
    header:{type:String, required: true},
    quote:{type:String, required: true}
})

module.exports = mongoose.model('Teacher', teacherSchema)