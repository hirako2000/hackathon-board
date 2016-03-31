var beautifyJs = require('js-beautify').js_beautify;
var beautifyCss = require('js-beautify').css;
var beautifyHtml = require('js-beautify').html;



exports.getBeautifier = function(req, res) {
    res.render('beautifier', { });
};

exports.postBeautifier = function(req, res) {
    var output;

    switch(req.body.lang) {
        case "js":
            output =  beautifyJs(req.body.content, { indent_size: req.body.indent });
            break;
        case "html":
            output =  beautifyHtml(req.body.content, { indent_size: req.body.indent });
            break;
        case "css":
            console.log('css it is !');
            output =  beautifyCss(req.body.content, { indent_size: req.body.indent });
            break;
        case "guess":
            output =  beautifyJs(req.body.content, { indent_size: req.body.indent });
            break;
        default:
            output =  beautifyJs(req.body.content, { indent_size: req.body.indent });
    }

    res.render('beautifier', { beautified : output });
};