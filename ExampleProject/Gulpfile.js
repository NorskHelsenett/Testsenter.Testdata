const ts = require("gulp-typescript");
const gulp = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const sysBuilder = require("systemjs-builder");
const destJsPath = "./Scripts/";
const destCssPath = "./Content/Styles/";


const tsConfig = require('./tsconfig.json');

// Delete the dist directory
gulp.task("clean", function () {
    return gulp.src(destJsPath)
        .pipe(clean());
});

// Bundle dependencies into vendors file
gulp.task("bundle:libs", function () {

    gulp.src([
        "node_modules/es6-shim/es6-shim.map",
        "node_modules/reflect-metadata/Reflect.js.map",
        "node_modules/systemjs/dist/system-polyfills.js.map",
    ]).pipe(gulp.dest(destJsPath));


    return gulp.src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/core-js/client/shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js",
        "node_modules/ng2-toastr/bundles/ng2-toastr.min.js",
        "node_modules/json-formatter-js/dist/json-formatter.js",
        "node_modules/moment/moment-with-locals.min.js",
        "node_modules/classlist-polyfill/src/index.js",
        "system.config.js"
    ])
        .pipe(concat("vendors.min.js"))
        .pipe(gulp.dest(destJsPath));
});

gulp.task("bundle:css", function() {
   return gulp.src([
            "node_modules/ng2-toastr/bundles/ng2-toastr.min.css"
   ])
        .pipe(concat("vendors.min.css"))
        .pipe(gulp.dest(destCssPath));
});

gulp.task("ts:compile", function (done) {
    return gulp.src(tsConfig.filesGlob).pipe(ts(tsConfig.compilerOptions)).pipe(gulp.dest("./App"));
});

// Generate systemjs-based builds
gulp.task("bundle:js", ["ts:compile"], function () {
    var builder = new sysBuilder("", "./systemjs.config.js");
    return builder.buildStatic("app", "./Scripts/app.js", { sourceMaps: true, encodeNames: false, minify: true });
});

gulp.task("build:prod", ["bundle:js", "bundle:libs","bundle:css"]);