const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function html() {
  return gulp.src('src/**/*.html')
                 .pipe(gulp.dest('dist/'))
                 .pipe(browserSync.reload({stream: true}));
}

function css() {
  return gulp.src('src/styles/**/*.css')
        .pipe(plumber())
        // .pipe(concat('bundle.css'))
                .pipe(gulp.dest('dist/styles'))
                .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('src/fonts/**/*.{css,woff}')
            .pipe(gulp.dest('dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
}

function scripts() {
  return gulp.src('src/scripts/**/*.js')
            .pipe(gulp.dest('dist/scripts'))
            .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/styles/**/*.css'], css);
  gulp.watch(['src/scripts/**/*.js'], scripts);
  gulp.watch(['src/fonts/**/*.{css,woff}'], fonts);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

const build = gulp.series(clean, gulp.parallel(html, css, images, fonts, scripts));
const watchapp = gulp.parallel(build, watchFiles, serve);


exports.html = html;
exports.css = css;
exports.images = images;
exports.fonts = fonts;
exports.scripts = scripts;
exports.clean = clean;

exports.watchapp = watchapp;
exports.build = build;

exports.default = watchapp;