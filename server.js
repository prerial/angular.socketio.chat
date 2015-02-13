var express = require('express'),
    app = module.exports.app = express();

app.configure(function () {
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.logger('dev'));  //tiny, short, default
    app.use(app.router);
    app.use(express.static(__dirname + '/client'));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));
});

app.listen(3000, function() {
    console.log("Listening on 3000");
});