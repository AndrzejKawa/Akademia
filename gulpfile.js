var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default',function () {
    nodemon({
        script: 'Serwer.js',
        ext: 'js',
        ignore: ['./node_modules/**']
    })
        .on('restart',function () {
            console.log('Restarting');
        })
});
