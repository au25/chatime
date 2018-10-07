let gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('compileSass', () => {
    gulp.src("scss/app.scss")
    .pipe(sass())
    .pipe(gulp.dest('public'));
})

gulp.task('watch', () =>{
    gulp.watch('scss/app.scss', ['compileSass']);
})