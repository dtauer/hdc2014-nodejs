//Gulp methods: task, run, watch, src, dest

// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');
var livereload = require('gulp-livereload');


// Concatenate & Minify JS
gulp.task('js', function() {
    return gulp.src(['js/angular.js', 'js/angular-route.js', 'js/app.js', 'js/**/*.js'])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// Concatenate & Minify CSS
gulp.task('css', function() {
  	return gulp.src('css/*.css')
  		.pipe(concat('styles.min.css'))
    	.pipe(minifyCSS({keepBreaks:true}))
    	.pipe(gulp.dest('dist/css'))
});

// index.html task
gulp.task('index', function() {
	return gulp.src('index.html')
	    .pipe(htmlreplace({
	        'css': 'css/styles.min.css',
	        'js': 'js/all.min.js'
	    }))
	    .pipe(gulp.dest('dist/'));
});

//Move images
gulp.task('img', function(){
	return gulp.src('css/*.png')
		.pipe(gulp.dest('dist/css'));
});

gulp.task('server', function(next) {
  var connect = require('connect'),
      server = connect();
  server.use(connect.static(dest)).listen(process.env.PORT || 80, next);
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'js']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('index.html', ['index']);
    
    livereload.listen();
 
  	// Watch any files in dist/, reload on change
  	gulp.watch(['dist/**']).on('change', livereload.changed);
});

// Default Task
gulp.task('default', ['js', 'css', 'index', 'img', 'watch']);








