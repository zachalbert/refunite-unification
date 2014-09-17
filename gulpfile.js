var gulp =          require('gulp');
var fileinclude =   require('gulp-file-include');
var rename =        require('gulp-rename');
var livereload =    require('gulp-livereload');
var notify =        require('gulp-notify');
var autoprefixer =    require('gulp-autoprefixer');
var sass =            require('gulp-sass');
var connect =         require('gulp-connect');
var uglify =          require('gulp-uglify');
var concat =          require('gulp-concat');
var minifyCSS =       require('gulp-minify-css');
var path =            require('path');
var mainBowerFiles =  require('main-bower-files');
var paths = {
  templates: './templates/',
  sass: './scss/',
  js: './js/'
};



// Server
gulp.task('connect', function() {
  connect.server({
    port: 5555,
    root: [__dirname],
    livereload: {
      port: 35728,
      auto: false
    }
  });
});



gulp.task('fileinclude', function() {
  return gulp.src(path.join(paths.templates, '*.tpl.html'))
    .pipe(fileinclude())
    .pipe(rename({
      extname: ""
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest('./site/'))
    .pipe(livereload())
    .pipe(notify({ message: 'HTML √' }));
});



// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src(path.join(paths.sass, '*.scss'))
    .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('./site/dist'))
    .pipe(livereload())
    .pipe(notify({ message: 'Sass √' }));
});



// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src([
    './bower_components/jquery/dist/jquery.min.js',
    path.join(paths.js, '**/*.js')
  ])
    .pipe(concat('js/main.js'))
    .pipe(gulp.dest('./site/dist/'))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./site/dist/'));
});



function watchStuff() {
  livereload.listen();
  gulp.watch(path.join(paths.sass, '**/*.scss'), ['sass']);
  gulp.watch(path.join(paths.js, '**/*.js'), ['scripts']);
  gulp.watch(path.join(paths.templates, '**/*.html'), ['fileinclude']);
}


// Watch
gulp.task('watch', function() {
  watchStuff();
});

// Default Task
gulp.task('default', ['fileinclude', 'sass', 'scripts', 'connect', 'watch']);
