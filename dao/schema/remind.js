let mongoose = require('mongoose');

let remind = new mongoose.Schema({
    id:String,
    userNo:String,
    eventId:String,
    remindDay:Number,
    inDt:Date,
    upDt:Date
}, { collection: 'remind' });

module.exports = mongoose.model('remind', remind);