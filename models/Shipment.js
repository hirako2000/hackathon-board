var mongoose = require('mongoose');

var shipmentSchema = new mongoose.Schema({
    id: Number,
    address: String,
    shipped: Number,
    location: String,
    requested: {
        small: Number,
        medium: Number,
        large: Number,
        xlarge: Number,
        xxlarge: Number,
        xxxlarge: Number
    },
    note: [String],
    dispatched: Boolean
});

shipmentSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};

var Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;