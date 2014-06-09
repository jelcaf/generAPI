var path = require("path");
var http = require("http");
var express = require("express");
var routes = require("./routes");

var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.favicon(__dirname + "/favicon.ico"));
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

var assetsPaths = [
  path.join(__dirname, "../public"),
  path.join(__dirname, "../client"),
  path.join(__dirname, "../.tmp")
];
assetsPaths.forEach(function (assetPath) {
  app.use("/assets", express.static(assetPath));
});


// development only
if ("development" === app.get("env")) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
