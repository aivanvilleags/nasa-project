const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type:Number,
        required:true
    },
    launchDate: {
        type:Date,
        required:true
    },
    mission:{
        type:String,
        required:true
    },
    rocket:{
        type:String,
        required:true
    },
    target:{
        type: String,
        required:true
    },
    customers: [String],
    upcoming:{
        type:Boolean,
        required:true
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    }

})

// connects launchesSchema with "launches" collection, it exports as the plural name and lowercase "launches"
module.exports =  mongoose.model('Launch', launchesSchema)