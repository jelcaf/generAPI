var gulp = require("gulp");
var gutil = require("gulp-util");
var less = require("gulp-less");

var paths = {
  less : "client/style/",
  dest : ".tmp"
};

gulp.task("less", function () {
  gulp.src(paths.less + "/main.less")
    .pipe(less())
    .pipe(gulp.dest(paths.dest + "/style/"));
});

gulp.task("watch", function () {
  gulp.watch(paths.less + "/*.less", ["less"]);
});

gulp.task("default", ["less"]);