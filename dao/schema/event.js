var mongoose = require('mongoose');

var event = new mongoose.Schema({
    id:String,
    title:String,
    regDt:Date,
    stDt:Date,
    enDt:Date,
    gameInfo: {
        id:String,
        name:String
    },
    url:String,
    type:String,
    pushInfo:{
        allowPush:Boolean,
        pushSuccess:Boolean
    }
}, { collection: 'event' });

module.exports = mongoose.model('event', event);