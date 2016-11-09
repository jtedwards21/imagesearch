var express = require('express')
var app = express()
var request = require('request')
var databaseUrl = "mongodb://localhost:27017/isearchdb";
var mongojs = require("mongojs");
var db = mongojs("isearchdb", ["isearches"]);
var key = "1cb53ae3e0d04d9c99bfe629b8b6d3be";
var query = "sushi";
var queryaddr = "http://api.bing.net/json.aspx?Appid=" + key + "&query=" + query + "&sources=web"

app.get('/', function (req, res) {
  //Show the last ten searches
  
  res.send('Hello World!')
})

app.get('/search/:query', function (req, res) {
　　request(queryaddr, function(error, response, body){
    if (!error && response.statusCode == 200){
	console.log(body)//Get from JSON

	//Place search data in database (term, when)
	db.isearches.insert({term: req.params.query, when: Date.now()})

	//Return JSON data
	
    }
  
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
