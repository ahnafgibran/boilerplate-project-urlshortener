var express = require("express");
var urlRouter = require("./url");

var app = express();

app.use("/shorturl", urlRouter);

module.exports = app;