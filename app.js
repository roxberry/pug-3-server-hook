var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var exec = require('child_process').exec;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.htm");
    console.log("GET / ::" + req.headers['x-forwarded-for']);
});

app.get('/payload', function(req, res) {
    res.sendStatus(200);
});

app.post('/payload', function (req, res) {
    exec ('git -C ../server reset --hard' , logActivity);

    exec ('git -C ../server clean -d -f' , logActivity);

    exec ('git -C ../server pull -f' , logActivity);

    res.sendStatus(200);
    res.end();
});

app.listen(65432, function () {
    console.log('listening on port 65432')
});

function logActivity(err, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
}