var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
app.use(bodyParser.json());

var database;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.post('/api/message', function(request, response){
  console.log(request.body);
  database.collection('messages').insertOne(request.body);
  response.status(200);
});

mongo.connect("mongodb://localhost:27017/test", function(err, client) {
  if (!err) {
     console.log("We are connected to Mongo DB");
     database = client.db('test');
  }
});

var server = app.listen(5000, function(){
  console.log("Server started in port", server.address().port);
});
