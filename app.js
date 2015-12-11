var frnt = require('frnt');
var fs = require("fs");
var hbs = require('hbs');
var mysql  = require('mysql');
var path = require("path");
var express = require("express");
var app    = express();
var doT = require('express-dot');

var pool =  mysql.createPool({
   connectionLimit : 100000000000, //important
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'Practice_Mysql',
   debug    :  false
});

app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){
  
  res.sendFile('index.html');
  
});

function handle_database(req,res) {

   pool.getConnection(function(err,connection){
   if (err) {
   connection.release();
   res.json({"code" : 100, "status" : "Error in connection database"});
   return;
   }   

   console.log('connected as id ' + connection.threadId);

   
   connection.query("select * from users",function(err,rows){
      connection.release();
      if(!err) {
      res.end(JSON.stringify(rows));
      }           
   });

   connection.on('error', function(err) {      
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;     
      });
   });
}



function save_user() {
   var user = {
      name : name,
      password : password,
      dept : dept,
      batch : batch,
      salary : salary
   };

   var sql = "INSERT INTO users(name,password,dept,batch,salary) VALUES ('user.name','user.password','user.dept','user.batch','user.salary')";
   connection.query(sal,function(err,res){
      if(!err) {
      console.log(res);
      }           
   });

}

app.get("/records",function(req,res){-
   handle_database(req,res);
});

app.get('/insert',function(req,res){
   save_user(req,res);
}); 

var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;
  
  console.log('Example app listening at http://%s:%s', host, port);
});

