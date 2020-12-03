const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: {type:String, required: true},
    comment:{type:String, required: true},
    image:{type:String, required: true},  
})

module.exports = mongoose.model('Review', reviewSchema)