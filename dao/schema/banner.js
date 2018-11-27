let mongoose = require('mongoose');

let banner = new mongoose.Schema({
    link:String,
    type:String,
    img:String,
    isUse:Boolean,
    title:String,
    message:String
}, { collection: 'banner' });

module.exports = mongoose.model('banner', banner);
