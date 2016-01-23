var mongoose = require('mongoose');
var md = require("node-markdown").Markdown;

var User = require('../models/User');
var Season = require('../models/Season');
var Category = require('../models/Category');
var Prize = require('../models/Prize');

exports.getAdmin = function(req, res) {
    res.render('admin', {  });
};

// Prizes
exports.getPrizes = function (req, res) {
    Prize.find(function(err, prizes) {
        Category.find(function (err, categories) {
            var lookup = {};
            for (var i = 0; i < categories.length; i++) {
                lookup[categories[i]._id] = categories[i].name;
            }
            if (err) return next(err);
            res.render('prizes', { md: md, prizes: prizes, categoryLookup: lookup });
        });
    });
};

exports.createPrize = function (req, res) {
    if (req.params.id) {
        Prize.findOne({ _id: req.params.id }, function(err, prize) {
            Category.find(function(err, categories) {
                if (err) return next(err);
                res.render('admin/create-prize', { prize: prize, id: req.params.id, categories: categories });
            });
        });
    } else {
        Category.find(function(err, categories) {
            res.render('admin/create-prize', { prize: new Prize(), categories: categories });
        });
    }
};

exports.postPrize = function (req, res) {
    User.findById(req.user.id, function(err, thisUser) {
        if (err) return next(err);
        if (thisUser.judge !== true) {
            res.redirect('/');
        } else {
            if (req.params.id) {
                Prize.findOne({ _id: req.params.id }, function(err, entity) {
                    if (err) return next(err);
                    entity.name = req.body.name || '';
                    entity.description = req.body.description;
                    entity.pictureURL = req.body.pictureURL;
                    entity.category = req.body.category;
                    entity.save(function(err, entity) {
                        if (err) return next(err);
                        req.flash('success', { msg: 'Prize edited'});
                        res.redirect('/prizes');
                    });
                });
            } else {
                var prize = new Prize();
                prize.name = req.body.name || '';
                prize.description = req.body.description;
                prize.pictureURL = req.body.pictureURL;
                prize.category = req.body.category;

                prize.save(function(err, entity) {
                    if (err) return next(err);
                    req.flash('success', { msg: 'Prize created.'});
                    res.redirect('/prizes');
                });
            }
        }
    });
};

// Categories
exports.getCategories = function (req, res) {
    Category.find(function(err, categories) {
        if (err) return next(err);
        res.render('categories', { categories: categories });
    });
};

exports.createCategory = function (req, res) {
    if (req.params.id) {
        Category.findOne({ _id: req.params.id }, function(err, category) {
            if (err) return next(err);
            res.render('admin/create-category', { category: category, id: req.params.id });
        });
    } else {
        res.render('admin/create-category', { category: new Category() });
    }
};

exports.postCategory = function (req, res) {
    User.findById(req.user.id, function(err, thisUser) {
        if (err) return next(err);
        if (thisUser.judge !== true) {
            res.redirect('/');
        } else {
            if (req.params.id) {
                Category.findOne({ _id: req.params.id }, function(err, entity) {
                    if (err) return next(err);
                    entity.name = req.body.name || '';
                    entity.description = req.body.description;
                    entity.save(function(err, entity) {
                        if (err) return next(err);
                        req.flash('success', { msg: 'Category edited'});
                        res.redirect('/categories');
                    });
                });
            } else {
                var category = new Category();
                category.name = req.body.name || '';
                category.description = req.body.description;

                category.save(function(err, entity) {
                    if (err) return next(err);
                    req.flash('success', { msg: 'Category created.'});
                    res.redirect('/categories');
                });
            }
        }
    });
};

// Seasons
exports.getSeasons = function (req, res) {
    Season.find(function(err, docs) {
        res.render('seasons', { seasons : docs });
    });
};

exports.createSeason = function(req, res, next) {
    User.findById(req.user.id, function(err, thisUser) {
        if (err) return next(err);
        if (thisUser.judge !== true) {
            throw "permission error";
        }
    });
    if (req.params.id) {
        Season.findOne({ _id: req.params.id }, function(err, season) {
            if (err) return next(err);
            res.render('admin/create-season', { season: season, id: req.params.id });
        });
    } else {
        res.render('admin/create-season', { season: new Season()});
    }
};

exports.postSeason = function (req, res) {
    User.findById(req.user.id, function(err, thisUser) {
        if (err) return next(err);
        if (thisUser.judge !== true) {
            throw "permission error";
        }
    });
    if (req.params.id) {
        Season.findOne({ _id: req.params.id }, function(err, entity) {
            if (err) return next(err);
            entity.name = req.body.name || '';

            if (req.body.current === 'true') {
                Season.update({current: true,  _id: {$ne : entity._id}}, {current: false}, {multi: true},
                    function(err, num) {
                    }
                );
            }

            entity.current = req.body.current;
            entity.save(function(err, entity) {
                if (err) return next(err);
                req.flash('success', { msg: 'Season edited'});
                res.redirect('/seasons');
            });
        });
    } else {
        var season = new Season();
        season.name = req.body.name || '';

        if (req.body.current === 'true') {
            Season.update({current: true}, {current: false}, {multi: true},
                function(err, num) {
                }
            );
        }

        season.current = req.body.current;

        season.save(function(err, entity) {
            if (err) return next(err);
            req.flash('success', { msg: 'Season created.'});
            res.redirect('/seasons');
        });
    }
};

