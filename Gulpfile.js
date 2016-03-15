/**
 * Created by peng.yifei on 2016/3/14.
 */

"use strict";

var gulp = require("gulp"),
    group = require("gulp-group-files"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    minifycss = require("gulp-minify-css");

//set project sass;
var sassFiles = {
    "sassApp" : {
        src : "/app/sass/**/*",
        dist : "/css"
    },
    "test" : {
        src : "/sass/**/*",
        dist : "/css"
    }
};

var allSassFiles = inObject(sassFiles);

gulp.task("sass", group(sassFiles, function(name, files){
    console.info(name);
    return gulp.src(name + files.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded'}).on('error', sass.logError))
        .pipe(minifycss({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie6',//类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true//类型：Boolean 默认：false [是否保留换行]
        }))
        .pipe(gulp.dest(name + files.dist));
}));

gulp.task("watch", function(){
    console.info(allSassFiles)
    gulp.watch(allSassFiles, ["sass"]);
});

gulp.task("default", ["watch"], function(){
    gulp.start("sass");
});

function inObject(items){
    var v = [];

    for(var i in items){
        v.push(i + items[i].src);
    }

    return v;
}