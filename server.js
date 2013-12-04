// External module dependencies
var express = require('express');
var http = require('http');
var path = require('path');

// My module
var cityRestService = require('./server/cities/service/cityRestService');

var app = express();

// Configuration
app.set('port', process.env.PORT || 8080);

// No templating, just static HTML
app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, 'client')));

// GZip compression
app.use(express.compress());

// Necessary for POST data
app.use(express.bodyParser());

// Needed for PUT and DELETE
app.use(express.methodOverride());

// Routing
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/cities', function (req, res) {
    res.json(cityRestService.readCities());
});

app.post('/cities', function (req, res) {
    res.json(cityRestService.saveCity(req.body));
});

app.put('/cities', function (req, res) {
    res.json(cityRestService.updateCity(req.body));
});

app.delete('/cities', function(req, res) {
    res.json(cityRestService.deleteCity(parseInt(req.query.id, 10)));
});

app.get('/cities/search', function (req, res) {
    res.json(cityRestService.searchCity(req.query.name));
});

// And fire up the server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});