var mongoose = require('mongoose');

var prizeSchema = new mongoose.Schema({
    id: Number,
    category: String,
    season: String,
    name: String,
    description: String,
    pictureURL: String
});

var Prize = mongoose.model('Prize', prizeSchema);

module.exports = Prize;
