/**
 * Created by peng.yifei on 2016/3/14.
 */

"use strict";
var signConfig = require("./sign.config");
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    gulpif = require("gulp-if"),
    cleanCss = require("gulp-clean-css"),
    runSequence = require("run-sequence"),
    browserSync = require("browser-sync"),//本地服务器
    rev = require("gulp-rev"),
    revCollector = require("gulp-rev-collector");

var reload = browserSync.reload;

// Server任务
gulp.task('serve', function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: "./",
            directory: true
        }
    });
});

gulp.task('watch', function(){
    runSequence([ 'revImg', 'miniCss'], 'revCollectorCss');

    gulp.watch([getFile('/sass/**/*.scss'), getFile('/sass/**/*.sass'), getFile('/_sass/**/*.scss'), getFile('/_sass/**/*.sass')], function(){
        return runSequence(['miniCss'], 'revCollectorCss', reload);
    });

    gulp.watch(getFile('/images/**/*'), function(){
        return runSequence(['revImg'], 'revCollectorCss', reload);
    });

    gulp.watch(getFile('/**/*.html'), function(){
        return runSequence(['html'], reload);
    });
});

function getFile(file){
    return signConfig.path() + file;
}

//压缩/合并CSS
gulp.task('miniCss', function(){
    return gulp.src(getFile('/sass/**/*'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepSpecialComments : "*,_",
            format: {
                breaks: { // controls where to insert breaks
                    afterBlockEnds: signConfig.setCssWrap ? signConfig.setCssWrap : false,
                    afterRuleEnds: signConfig.setCssWrap ? signConfig.setCssWrap : false
                }
            }
        }))
        .pipe(gulpif(
            signConfig.setSassMap ? signConfig.setSassMap : false,
            sourcemaps.write('../_sass', {
                addComment : true,
                sourceRoot: '../sass'
            })
        ))
        .pipe(gulp.dest(getFile('/css') ));
});

//Images 根据MD5获取版本号
gulp.task('revImg', function(){
    return gulp.src(getFile('/images/**/*'))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(getFile('/_sass')));
});

//生成/压缩/合并CSS 和 Image 版本号，后CSS里更新引入文件版本号
gulp.task('revCollectorCss', function () {
    return gulp.src([getFile('/_sass/**/*.json'), getFile('/css/**/*.css')])
        .pipe(revCollector({
            replaceReved : true,
            dirReplacements: {}
        }))
        .pipe(gulp.dest(getFile('/css')));
});

gulp.task('html', function(){});

//单独目录编译 ( 配置本地：sign.config.js)
gulp.task('sign', function(){
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: getFile(""),
            directory: true
        }
    });

    runSequence('watch');
});

//default
gulp.task('default', function(){
    runSequence('serve');
    runSequence('watch');
});