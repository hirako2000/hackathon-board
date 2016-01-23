var mongoose = require('mongoose');

var Shipment = require('../models/Shipment.js');
var User = require('../models/User.js');

exports.getTshirt = function(req, res) {
    res.render('tshirt', { });
};

exports.postTshirt = function(req, res, next) {
    if (req.body.location === 'Remote') {
        // That's a remote shipment request, create new shipment entry
        var shipment = new Shipment();
        shipment.location = req.body.location;
        var addressName = req.body.name ? req.body.name : req.body.email;
        var constructedAddress = req.body.address ? (addressName + '\n' + req.body.address) : addressName;
        shipment.address = constructedAddress;
        shipment.note[0] = req.body.note || '';
        shipment.requested[req.body.size] = 1;
        shipment.dispatched = false;

        shipment.save(function(err, entity) {
            if (err) return next(err);
            req.flash('success', { msg: req.body.size + ' t-shirt for Remote shipment requested.'});
            res.redirect('/');
        });

    } else {
        // That's an office shipment request, add to request count
        Shipment.find({ location : req.body.location, dispatched: false }, function(err, shipment) {
            if (shipment.length === 0) {
                // first shipment request for this location, create an entry
                var shipment = new Shipment();
                shipment.requested[req.body.size] = 1;
                shipment.location = req.body.location;
                shipment.shipped = 0;
                shipment.address = req.body.location + ' office';
                shipment.note[0] = req.body.email;
                shipment.dispatched = false;

                shipment.save(function (err, entity) {
                    if (err) return next(err);
                    req.flash('success', {msg: req.body.size + ' t-shirt for ' + req.body.location + ' requested.'});
                    res.redirect('/');
                });
            } else {
                switch(req.body.size) {
                    case 'small':
                        Shipment.findAndModify({ location : req.body.location, dispatched: false }, [],
                                                { $inc: { 'requested.small': 1 },
                                                    $push: { 'note' : req.body.email}
                                                }, {}, function (err, entity) {
                            if (err) throw err;
                            console.log('updated shipment, ' +  req.body.size + ' requested count for ' + req.body.location + ' is incremented');
                            req.flash('success', {msg: req.body.size + ' t-shirt for ' + req.body.location + ' requested.'});
                            res.redirect('/');
                        });
                        break;
                    case 'medium':
                        Shipment.findAndModify({ location : req.body.location, dispatched: false }, [],
                                                { $inc: { 'requested.medium': 1 },
                                                $push: { 'note' : req.body.email}
                                                }, {}, function (err, entity) {
                            if (err) throw err;
                            console.log('updated shipment, ' +  req.body.size + ' requested count for ' + req.body.location + ' is incremented');
                            req.flash('success', {msg: req.body.size + ' t-shirt for ' + req.body.location + ' requested.'});
                            res.redirect('/');
                        });
                        break;
                    case 'large':
                        Shipment.findAndModify({ location : req.body.location, dispatched: false }, [],
                                                { $inc: { 'requested.large': 1 },
                                                    $push: { 'note' : req.body.email}
                                                }, {}, function (err, entity) {
                            if (err) throw err;
                            console.log('updated shipment, ' +  req.body.size + ' requested count for ' + req.body.location + ' is incremented');
                            req.flash('success', {msg: req.body.size + ' t-shirt for ' + req.body.location + ' requested.'});
                            res.redirect('/');
                        });
                        break;
                    case 'xlarge':
                        Shipment.findAndModify({ location : req.body.location, dispatched: false }, [],
                                                { $inc: { 'requested.xlarge': 1 },
                                                    $push: { 'note' : req.body.email}
                                                }, {}, function (err, entity) {
                            if (err) throw err;
                            console.log('updated shipment, ' +  req.body.size + ' requested count for ' + req.body.location + ' is incremented');
                            req.flash('success', {msg: req.body.size + ' t-shirt for ' + req.body.location + ' requested.'});
                            res.redirect('/');
                        });
                        break;
                    case 'xxlarge':
                        Shipment.findAndModify({ location : req.body.location, dispatched: false }, [],
                                                { $inc: { 'requested.xxlarge': 1 },
                                                    $push: { 'note' : req.body.email}
                                                }, {}, function (err, entity) {
                            if (err) throw err;
                            console.log('updated shipment, ' +  req.body.size + ' requested count for ' + req.body.location + ' is incremented');
                            req.flash('success', {msg: req.body.size + ' t-shirt for ' + req.body.location + ' requested.'});
                            res.redirect('/');
                        });
                        break;
                    case 'xxxlarge':
                        Shipment.findAndModify({ location : req.body.location, dispatched: false }, [],
                                                { $inc: { 'requested.xxxlarge': 1 },
                                                    $push: { 'note' : req.body.email}
                                                }, {}, function (err, entity) {
                            if (err) throw err;
                            console.log('updated shipment, ' +  req.body.size + ' requested count for ' + req.body.location + ' is incremented');
                            req.flash('success', {msg: req.body.size + ' t-shirt for ' + req.body.location + ' requested.'});
                            res.redirect('/');
                        });
                        break;
                }

            }
        });
    }

};

exports.getShipment = function(req, res, next) {
    User.findById(req.user.id, function(err, thisUser) {
        if (err) return next(err);
        if (thisUser.judge !== true) {
            throw "permission error";
        } else {
            Shipment.find(function(err, shipments) {
                if (shipments.length > 1) {
                    shipments.reverse();
                }
                res.render('shipments', { shipments: shipments});
            });
        }
    });

};

exports.markAsDispatched = function(req, res, next) {
    User.findById(req.user.id, function(err, thisUser) {
        if (err) return next(err);
        if (thisUser.judge !== true) {
            throw "permission error";
        } else {
            Shipment.findOne({ _id: req.body.id }, function(err, shipment) {
                shipment.dispatched = true;
                shipment.save(function(err) {
                    if (err) return next(err);
                    req.flash('success', { msg: 'Marked as dispatched.' });
                    res.redirect('shipment');
                });
            });
        }
    });

};


