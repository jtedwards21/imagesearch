var express = require('express')
var app = express()
var request = require('request')
//Install and Configure db
var key = "1cb53ae3e0d04d9c99bfe629b8b6d3be";
var query = "sushi";
var queryaddr = "http://api.bing.net/json.aspx?Appid=" + key + "&query=" + query + "&sources=web"

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/search/:query', function (req, res) {
　　request(queryaddr, function(error, response, body){
    if (!error && response.statusCode == 200){
	console.log(body)//Get from JSON
    }
  
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
