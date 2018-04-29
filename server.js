var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());

var Message = mongoose.model('Message',{
  msg : String
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.get('/api/message', getMessages);

app.post('/api/message', function(request, response){
  console.log("Request body : " + request.body);
  var message = new Message(request.body);
  let messages;
  message.save().then(function(){
    Message.find({}).exec(function(err, result){
      console.log("Response ________ " + result);
      response.status(200).send(result);
    });
  });
});

function getMessages(req, res) {
  Message.find({}).exec(function(err, result){
    res.send(result);
  })
}

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
  if (!err) {
     console.log("We are connected to Mongo DB");
  }
});

var server = app.listen(5000, function(){
  console.log("Server started in port", server.address().port);
});
