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


app.get('/latest', function (req, res) {
  db.isearches.find().sort({date: -1}, function (err, docs) {
    // get ten of these
    var ten = docs.slice(0,9);
    //Send JSON data
    res.send(JSON.stringify(ten));
  });
  
  
})

app.get('/search/:query', function (req, res) {
  var options = m_options(req.params.query, 10, 0);
　　request(options, function(error, response, body){
	if (!error && response.statusCode == 200) {
	var info = JSON.parse(body);
	var pics = []
	var j = 10;
	
	//Get only necessary data out of the json terms
	info = info.value;
	while(j > 0){
	  pics.push({"url": info[j].contentUrl, "imageUrl": info[j].thumbnailUrl, "name": info[j].name});
	　　j = j-1;
	}
	//Place search data in database (term, when)
	db.isearches.insert({term: req.params.query, when: Date.now()})

	//Return JSON data
	res.send(JSON.stringify(pics));
  	}
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
