var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var gulpImport = require("gulp-html-import");
var browserify = require("browserify");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var responsive = require('gulp-responsive');
var browserSync = require('browser-sync').create();

// Default task
gulp.task("default",["html","sass"], function(){
browserSync.init({server:"dist/", "browser": "google chrome"}); //Starting browsersync on the  src folder
gulp.watch(["src/public/scss/*.scss", "src/public/scss/**/*.scss"], ["sass"]); // execute the sass task
gulp.watch("src/*.html").on("change", browserSync.reload); //reload the html files
gulp.watch("src/*.html", function(){
    browserSync.reload;
    notify().write("Browser reloaded");
} )
gulp.watch(["src/*.html","src/**/*.html"],["html"]);

});

//Copy and import HTML
gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(gulpImport("src/views/includes/")) // replace the htmls @import
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        .pipe(notify("HTML imported"))
});

// Compile SASS
gulp.task("sass", function(){
gulp.src("src/public/scss/style.scss") //Loaded the style.scss file
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", function(error){
        return notify().write(error) // Show notification if there is an error
    })) //compile
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/")) //save
    .pipe(browserSync.stream())// reload the css on browser
    .pipe(notify("SASS compiled")); //Show notifactions on screen
});

//Compile JS
gulp.task("js", function() {
    gulp.src("src/public/js/main.js")
        .pipe(tap(function(file){
            file.contents = browserify(file.path, {debug:true})
                .transform("babelify", {presets:["es2015"]})
                .bundle()
                .on("error", function(error) {
                    return notify().write(error);
                })
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        .pipe(notify("JS Compiled"))
})

// Resize and rename image task
gulp.task("img", function(){
    gulp.src("src/public/img/*")
        .pipe(responsive({
            "*.png":[
                {width: 150, rename:{suffix:"-150px"}},
                {width: 250, rename:{suffix:"-250px"}},
                {width: 300, rename:{suffix:"-300px"}}
            ]
        }))
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img/"))
});