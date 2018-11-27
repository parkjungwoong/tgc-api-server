let mongoose = require('mongoose');

let appVer = new mongoose.Schema({
    os:String,
    version:String,
    latest:Boolean,
    appLink:String,
    message:String,
    isNecessary:Boolean
}, { collection: 'appVer' });

module.exports = mongoose.model('appVer', appVer);
