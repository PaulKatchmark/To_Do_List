var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var todo = require('./routes/todo.js');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.use('/todo', todo);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/views/index.html'));
});


var port = 3000;
var server = app.listen(port, function() {
    console.log('Listening on port ', server.address().port);
});
