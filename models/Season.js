var mongoose = require('mongoose');

var seasonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    current: Boolean
});

var Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
