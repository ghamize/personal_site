//initialize express
var express = require('express');

//run express
var app = express();

//api config
app.use(express.static(__dirname + './../app/'));

//change port to 80
var PORT = 80;

//responses
app.listen(80,function(){
	console.log('Server started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');

});