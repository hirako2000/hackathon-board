var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
