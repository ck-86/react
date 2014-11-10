var express = require('express');
var app = express();
var port = 8080 || process.env.PORT;

app.use(express.static(__dirname + '/public'));

app.listen(port , function () {
	console.log('On Port : ', port);
});
