var express = require('express')
var app = express()
var request = require('request')
var databaseUrl = "mongodb://localhost:27017/isearchdb";
var mongojs = require("mongojs");
var db = mongojs("isearchdb", ["isearches"]);
var key = "55cc5f31c4d943ebbf0d522481bab5cd";
var query = "sushi";

function m_options(q, count, offset){
  var url = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + q + "&count=1" + count + "&offset=" + offset + "&mkt=en-us&safeSearch=Moderate";
  return {
  	url: url,
  	headers: {
	"Ocp-Apim-Subscription-Key": key
 	}
　　}
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
	var info = JSON.parse(body);
	console.log(info);
	//Place search data in database (term, when)
	//db.isearches.insert({term: req.params.query, when: Date.now()})

	//Return JSON data
  }
}

app.get('/', function (req, res) {
  //Show the last ten searches
  
  res.send('Hello World!')
})

app.get('/search/:query', function (req, res) {
  var options = m_options("cats", 10, 0);
　　request(options, callback);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
