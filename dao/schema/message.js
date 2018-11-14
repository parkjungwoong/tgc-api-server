let mongoose = require('mongoose');

let message = new mongoose.Schema({
    id:String,
    content:String,
    inDt:Date,
    upDt:Date,
    userNo:String,
    readYn:String,
    type:String
}, { collection: 'message' });

module.exports = mongoose.model('message', message);