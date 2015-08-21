var express    = require('express');
var cors       = require('cors');
var app        = express();
var bodyParser = require('body-parser');

var globSync          = require('glob').sync;
var routes            = globSync('./routes/*.js', { cwd: __dirname}).map(require);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var Dynamite = require('dynamite');
var client   = new Dynamite.Client({
    region          : 'us-east-1',
    accessKeyId     : '',
    secretAccessKey : ''
});

var port = process.env.PORT || 8080;

routes.forEach(function(route) { route(app, client); });

app.listen(port);
console.log('magic is happening on port '+port);
