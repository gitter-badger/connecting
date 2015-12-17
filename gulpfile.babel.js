'use strict';
import gulp from 'gulp';
import babel from 'gulp-babel';
import minifyCss from 'gulp-minify-css';
import less  from 'gulp-less';
import path  from 'path';

gulp.task('babel', ()=>{
  return gulp.src('src/**/*.js')
  .pipe(babel({
    presets:['es2015']
}))
  .pipe(gulp.dest('app'));
});

gulp.task('less', () => {
  return gulp.src('src/view/less/*.less')
    .pipe(less()).pipe(minifyCss())
    .pipe(gulp.dest('app/view/css'));
});

gulp.task('html',()=>{
  return gulp.src('src/**/*.html')
  .pipe(gulp.dest('app'));
});
// gulp.task('minify-css', ()=> {
//   return gulp.src('src/**/*.css')
//     .pipe(minifyCss({compatibility: 'ie8'}))
//     .pipe(gulp.dest('app'));
// });

gulp.task('config', ()=>{
  return gulp.src('src/**/*.json')
  .pipe(gulp.dest('app'));
});

gulp.task('photon', ()=> {
  gulp.src('node_modules/photon/dist/css/*')
    .pipe(gulp.dest('app/view/photon/css'));

    gulp.src('node_modules/photon/dist/fonts/*')
    .pipe(gulp.dest('app/view/photon/fonts'));
});

gulp.task('watch', ()=>{
  gulp.watch('src/**/*.html',['html']);
  gulp.watch('src/**/*.json',['config']);
  gulp.watch('src/**/*.less',['less']);
  gulp.watch('src/**/*.js',['babel']);
});

gulp.task('default',['watch','babel','less','html','config']);

