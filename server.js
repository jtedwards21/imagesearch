var express = require('express')
var app = express()
var key = "1cb53ae3e0d04d9c99bfe629b8b6d3be";
var query = "sushi";
var queryaddr = "http://api.bing.net/json.aspx?Appid=" + key + "&query=" + query + "&sources=web"

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/search/:query', function (req, res) {
  var jsonResp = 'l'//Query Bing, Use Request to make a call
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
