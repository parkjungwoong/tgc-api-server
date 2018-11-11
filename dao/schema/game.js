var mongoose = require('mongoose');

var game = new mongoose.Schema({
    id: String,
    name: String,
    type: Array,
    subscribeCount: Number,
    content: String,
    img: String
}, { collection: 'game' });

module.exports = mongoose.model('game', game);