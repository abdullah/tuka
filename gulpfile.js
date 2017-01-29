var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    rev = require('gulp-rev'),
    htmlReplace = require('gulp-html-replace'),
    revReplace = require('gulp-rev-replace'),
    htmlMin = require('gulp-htmlmin'),
    path = require('path'),
    revNapkin = require('gulp-rev-napkin'),
    del = require('del'),
    server = require('gulp-server-livereload'),
    filenames = require('gulp-filenames'),
    shell = require('gulp-shell'),
    symlink = require('gulp-symlink'),
    runSequence = require('run-sequence');


gulp.task('default', function (callback) {
    runSequence('clean:before',
        ['deps', 'dev-process-html'],
        'dev-symlink',
        'watch',
        'serve',
        callback);
});


gulp.task('bundle', function (callback) {
    runSequence('clean:before',
        ['compile', 'minify-css'],
        // ['static'],
        ['revision', 'static'],
        'bundle-process-html',
        'clean:after', callback);
});


gulp.task('clean:before', function (callback) {
    del('dist/*', callback);
});


gulp.task('clean:after', function (callback) {
    del('rev-manifest.json', callback);
});


gulp.task('minify-css', function () {
    return gulp.src(['src/css/reset.css', 'src/css/base.css', 'src/**/*.css']).
        pipe(concatCss('style.css', {
            rebaseUrls: false
        })).
        pipe(minifyCss()).
        pipe(gulp.dest('dist'));
});


gulp.task('revision', function () {
    return gulp.src(['dist/script.js', 'dist/style.css']).
        pipe(rev()).
        pipe(gulp.dest('dist')).
        pipe(revNapkin()).
        pipe(rev.manifest()).
        pipe(gulp.dest(''));
});


gulp.task('static', function () {
    return gulp.src('static/**/*').
        pipe(gulp.dest('dist/static'));
});


gulp.task('get-css', function () {
    return gulp.src(['src/**/reset.css', 'src/**/base.css', 'src/**/*.css']).
        pipe(filenames('css'));
});


gulp.task('bundle-process-html', function () {
    var manifest = gulp.src('./rev-manifest.json');

    return gulp.src('src/index.html').
        pipe(htmlReplace({
            'dev': ['style.css', 'script.js']
        })).
        pipe(gulp.dest('dist')).
        pipe(revReplace({ manifest: manifest })).
        // pipe(htmlMin({collapseWhitespace: true})).
        pipe(gulp.dest('dist'));
});


gulp.task('dev-process-html', ['get-css'], function () {
    var css = filenames.get('css');
    var js = ['node_modules/google-closure-library/closure/goog/base.js', 'deps.js'];

    return gulp.src('src/index.html').
        pipe(htmlReplace({
            'dev': css.concat(js)
        }, {
                keepUnassigned: true
            })).
        pipe(gulp.dest('dist'));
});


gulp.task('dev-symlink', function () {
    return gulp.src(['node_modules/', 'src/*', '!src/index.html'], { read: false }).
        pipe(symlink(function (file) {
            return path.join('dist', file.relative);
        }, { force: true }));
});


gulp.task('watch', function () {
    function changeLogger(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }

    gulp.watch('src/**/*.js', ['deps']).on('change', changeLogger);
    gulp.watch('src/index.html', ['dev-process-html']).on('change', changeLogger);
});


gulp.task('serve', function () {
    return gulp.src('dist').pipe(server({
        watchPath: 'src',
        port: 1992,
        livereload: {
            enable: true,
            path: 'src'
        },
        open: true
    }));
});


var closureDeps = require('gulp-closure-deps');
var closureCompiler = require('gulp-closure-compiler');

var gulp = require('gulp');


var paths = {
    scripts: [
        'node_modules/google-closure-library/closure/goog/**/*.js',
        'src/**/*.js',
    ]
};


gulp.task('deps', function () {
    gulp.src(paths.scripts)
        .pipe(closureDeps({
            fileName: 'deps.js',
            prefix: '../../../../',
            baseDir: 'src'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('compile', function () {
    return gulp.src(paths.scripts)
        .pipe(closureCompiler({
            compilerPath: 'node_modules/google-closure-compiler/compiler.jar',
            fileName: 'app.js',
            compilerFlags: {
                closure_entry_point: 'app',
                compilation_level: 'ADVANCED_OPTIMIZATIONS',
                only_closure_dependencies: true,
                warning_level: 'QUIET',
                formatting: 'PRETTY_PRINT',
                generate_exports: true,
                output_wrapper: '(function(){%output%})();',
            }
        }))
        .pipe(gulp.dest('dist'));
});



