var gulp = require("gulp");
var gutil = require("gulp-util");
var less = require("gulp-less");
var jshint = require("gulp-jshint");
var mocha = require("gulp-mocha");

var paths = {
  less : "client/style/",
  dest : ".tmp",
  server : "server/"
};

gulp.task("less", function () {
  gulp.src(paths.less + "/main.less")
    .pipe(less())
    .pipe(gulp.dest(paths.dest + "/style/"));
});

gulp.task("watch", function () {
  gulp.watch(paths.less + "/*.less", ["less"]);
});

gulp.task("jshint", function () {
  gulp.src(paths.server + "/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task("test-server", function () {
  process.NODE_ENV = "test";
  gulp.src("server/test/**/*Test.js")
    .pipe(mocha());
});

gulp.task("test", ["jshint", "test-server"]);

gulp.task("default", ["less"]);