const express = require('express');
const connect = require('connect');
const app = require('express')();
const bodyParser = require('body-parser');
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b7c47176d7d1a4",
  password: "559fe177",
  database: "heroku_f8964801b69450f",
  timezone: 'jst',
  port: 3307
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.get("/", function(req, res) {
  res.send("go to /posts to see posts");
});

app.get("/posts", function(req, res) {
  console.log("select * from todos order by status , limit_date");
  connection.query("select * from todos order by status , limit_date", function(
    error,
    results,
    fields
  ) {
    console.log(results);
    if (error) throw error;
    res.send(results);
  });
});

app.get("/categorys", function(req, res) {
  console.log("select * from category");
  connection.query("select * from category", function(
    error,
    results,
    fields
  ) {
    console.log(results);
    if (error) throw error;
    res.send(results);
  });
});

app.post("/categorys/category", function(req, res) {
  console.log("select * from category where id = " + req.body.id);
  connection.query("select * from category where id = " + req.body.id, function(
    error,
    results,
    fields
  ) {
    console.log(results);
    if (error) throw error;
    res.send(results);
  });
});

app.post("/posts/category", function(req, res) {
  console.log('select * from todos where category = ' + req.body.category + ' order by status , limit_date');
  connection.query('select * from todos where category = ' + req.body.category + ' order by status , limit_date', function(
    error,
    results,
    fields
  ) {
    console.log(results);
    if (error) throw error;
    res.send(results);
  });
});

app.post("/posts/edit", function(req, res) {
  console.log('select * from todos where id = ' + req.body.id);
  connection.query('select * from todos where id = ' + req.body.id, function(
    error,
    results,
    fields
  ) {
    console.log(results);
    if (error) throw error;
    res.send(results);
  });
});

app.post("/insert", function(req, res) {
  console.log('insert into todos (title, content, limit_date, category, status) values ("' + req.body.title + '", "' + req.body.content + '", "' + req.body.limit + '", ' + req.body.category + ', 0)');
  connection.query('insert into todos (title, content, limit_date, category, status) values ("' + req.body.title + '", "' + req.body.content + '", "' + req.body.limit + '", ' + req.body.category + ', 0)', function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/update", function(req, res) {
  console.log('update todos set title = "' + req.body.title + '", content = "' + req.body.content + '", limit_date = "' + req.body.limit + '", category = ' + req.body.category + ' where id = ' + req.body.id);
  connection.query('update todos set title = "' + req.body.title + '", content = "' + req.body.content + '", limit_date = "' + req.body.limit + '", category = ' + req.body.category + ' where id = ' + req.body.id, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/category/update", function(req, res) {
  console.log('update category set title = "' + req.body.category + '" where id = ' + req.body.id);
  connection.query('update category set title = "' + req.body.category + '" where id = ' + req.body.id, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/category/insert", function(req, res) {
  console.log('insert into category (title) values ("' + req.body.title + '")');
  connection.query('insert into category (title) values ("' + req.body.title + '")', function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/category/delete", function(req, res) {
  console.log('delete from category where id = "' + req.body.id + '"');
  connection.query('delete from category where id = "' + req.body.id + '"', function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/update/status", function(req, res) {
  console.log('update todos set status = ' + req.body.status + ' where id = ' + req.body.id);
  connection.query('update todos set status = ' + req.body.status + ' where id = ' + req.body.id, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/delete", function(req, res) {
  console.log('delete from todos where id = "' + req.body.id + '"');
  connection.query('delete from todos where id = "' + req.body.id + '"', function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

var port = process.env.PORT || 4000;

server.listen(port, function() {
  console.log("App is running on port " + port);
});

server.listen(port, () => {
  console.log("App is running on port " + port);
});


// app.listen(process.env.PORT || 4000, function() {
//   console.log("Example app listening on port 4000!");
// });

