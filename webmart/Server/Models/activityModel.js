const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    description : {
        required : true ,
        type : String
    }

},{timestamps: true})

const Activity = mongoose.model('Activity',activitySchema)

module.exports = Activity ; 