var mongoose = require('mongoose');

var rulesSchema = new mongoose.Schema({
    id: Number,
    description: String
});

var Rules = mongoose.model('Rules', rulesSchema);

module.exports = Rules;
