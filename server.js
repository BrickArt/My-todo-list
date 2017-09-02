//===========================================
// Includes
//===========================================
var express = require ('express');
var http = require ('http');
var bodyParser = require ('body-parser');
var MongoClient = require ('mongodb').MongoClient;
var ObjectID = require ('mongodb').ObjectID;
var path = require('path');
var mongoose = require('mongoose');
var db = require ('./config/db');

var app = express ();

//===========================================
// Configurate
//===========================================


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.disable('x-powered-by');
app.set('view engine', 'jade');

app.set('views', __dirname + '/views');

//===========================================
// Routes
//===========================================


app.get('/', function(req, res) {
  var docs = db.collection('projects').find().toArray(function (err, docs){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    console.log(docs);
    var tasks = db.collection('tasks').find().toArray(function (err, tasks){
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      console.log(tasks);
      var m = {
        docs: docs,
        tasks: tasks
      };
      console.log(m);
      res.render('index', m);
    });
  });
});


//-----------Projects-------------
app.post('/test', function(req, res){
  console.log(req.body);
  var project = {
    name: req.body.name
  };
  db.collection('projects').insert(project, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(project);
    console.log(project);
  });
});



app.delete('/delete/:id', function(req, res) {
  console.log(req.params.id);
  db.collection('projects').deleteOne(
    { _id: ObjectID(req.params.id)},
    function(err, result){
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      };
    console.log('Task deleted');
    res.sendStatus(200);
  });
});



app.put('/edit/:id', function(req, res){
  db.collection('projects').updateOne(
    { _id: ObjectID(req.params.id) },
    {$set: { name: req.body.name }},
    function(err, result){
      if (err) {
        console.log(err);
        return res.sendStatus(500);
        }
    });
  return res.sendStatus(200);
});



//-----------Tasks-------------
app.post('/task/:id', function(req, res){
  console.log(req.params.id);
  console.log(req.body);
  var task = {
    name: req.body.name,
    status: '',
    projectID: req.params.id
  };
  db.collection('tasks').insert(task, function(err, result){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(task);
    console.log(task);
  });
});



app.delete('/delete/task/:id', function(req, res) {
  console.log(req.params.id);
  db.collection('tasks').deleteOne(
    { _id: ObjectID(req.params.id)},
    function(err, result){
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      };
    console.log('deleted');
    res.sendStatus(200);
  });
});



app.put('/edit/task/:id', function(req, res){
  db.collection('tasks').updateOne(
    { _id: ObjectID(req.params.id) },
    {$set: { name: req.body.name }},
    function(err, result){
      if (err) {
        console.log(err);
        return res.sendStatus(500);
        }
    });
    console.log(req.body);
  return res.sendStatus(200);
});



//---------------Check-----------
app.put('/check/:id', function(req, res){
  db.collection('tasks').updateOne(
    { _id: ObjectID(req.params.id) },
    {$set: { status: req.body.name }},
    function(err, result){
      if (err) {
        console.log(err);
        return res.sendStatus(500);
        }
    });
    console.log(req.body);
  return res.sendStatus(200);
});


app.get('/*', function(req, res){
  res.redirect('/');
});
//===========================================
// Conecting
//===========================================
MongoClient.connect(process.env.MONGODB_URI, function(err, database){
  if (err) {
     console.log(err);
     return res.sendStatus(500);
     }
  db = database;
  app.listen(process.env.PORT || 3000);

 // app.listen(port_number);
//   var server = app.listen(config.get('port'), function(){
//     console.log('Listen on port ' + config.get('port'))
//});
});
