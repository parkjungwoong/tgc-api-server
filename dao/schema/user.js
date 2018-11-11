var mongoose = require('mongoose');

var user = new mongoose.Schema({
    id:String,
    name:String,
    email:String,
    thirdPartyLink: Array,
    pw:String,
    state:Number,
    setInfo: {
        push:Date,
        marketing:Date
    },
    device: {
        appVer:String,
        osType:String,
        osVer:String
    },
    token: String,
    lastAccess: Date,
    inDt: Date,
    //inDt: { type: Date, default: Date.now },
    upDt: Date,
    subscribeList: Array
}, { collection: 'user' });

module.exports = mongoose.model('user', user);