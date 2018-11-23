let mongoose = require('mongoose');

let user = new mongoose.Schema({
    userNo:String,
    name:String,
    email:String,
    thirdPartyLinkApp:String,
    thirdPartyLinkInfo:Map,
    pw:String,
    state:Number,
    setInfo: {
        pushAgree:Date,
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
    subscribeList: [ { gameInfo : { type: mongoose.Schema.Types.ObjectId, ref: 'game' }, inDt: { type: Date, default: Date.now } }]
}, { collection: 'user' });

module.exports = mongoose.model('user', user);