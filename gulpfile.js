'use strict';

const gulp = require('gulp'),
  path = require('path'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  //browserSync = require('browser-sync').create(),
  //sass = require('gulp-sass'),
  sass   = require('gulp-sass'),
  svgSymbols = require('gulp-svg-symbols'),
  config = require('./octwall.config');

const destDir = 'dest',
  srcDir = 'src';

const spriteSuffix = '-sprite';

gulp.task('sprite', () => {

  let svgDir = config.svgDir || [];
  svgDir.forEach((dirName) => {
    let svgGlob = dirName + '/*.svg';

    // generate sprite for each svgDir
    gulp
      .src(svgGlob)
      .pipe(svgSymbols({
        templates: ['default-svg'],
        transformData: function(svg, defaultData, options) {
          if (!svg.originalAttributes.viewBox) {
            svg.viewBox = '0 0 ' + svg.width + ' ' + svg.height;
            // hack for github octicons
            // https://github.com/Hiswe/gulp-svg-symbols/blob/master/lib/svg.js#L92
            // https://raw.githubusercontent.com/Hiswe/gulp-svg-symbols/master/templates/svg-symbols.svg
          }
          return defaultData;
        }
      }))
      .pipe(rename((path) => {
        path.basename = dirName + '-sprite';
        path.extname = '.svg';
      }))
      .pipe(gulp.dest('src'));
  });

});

// sass task for init page (main.css)
gulp.task('sass', () => {
  return gulp.src('src/main.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('dest'));
});

// sass task for pattern page (style.css)
gulp.task('sasses', () => {
  let colors = config.colors || ['belize-hole'];

  colors.forEach( (color) => {
    gulp.src('src/octwall.scss')
      .pipe(replace('%color%', '$' + color))
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(gulp.dest('dest/' + color));
  });

});

// actually inject needed variables into deps.js
gulp.task('injectSvgName', ['sprite'], () => {

  const fs = require('fs');
  let svgArr = [];
  let injectTarget = 'dest/deps.js';

  let enabledSprites = config.svgSprite || [];

  // also add the sprite we just generated
  let svgDir = config.svgDir || [];
  svgDir.forEach((dirName) => {
    enabledSprites.push(dirName + spriteSuffix + '.svg');
  });


  for(var i =0; i < enabledSprites.length; i++ ) {
    console.log(enabledSprites[i])
    parseOneSprite(enabledSprites[i], svgArr);
  }

  let svgs = 'var svgs=[';

  svgArr.forEach((svg) => {
    svgs += '"' + svg + '",';
  });

  svgs += '];';

  // inject other needed variables
  // not appropriate here?
  svgs += 'var exclude=' + config.exclude + ';';
  svgs += 'var include=' + config.include + ';';

  fs.writeFileSync(injectTarget, svgs);

  // parse svg ids in svg sprite file <filename> into array <svgArr>
  function parseOneSprite(filename, svgArr) {
    let data;
    try {
      data = fs.readFileSync('src/' + filename);
    } catch(e) {
      console.log('Error reading ' + filename);
      return;
    }

    let content = data.toString();

    let pat = /<symbol\s[^\n]*?id="(\w+)"/;
    let cap;


    while(cap = content.match(pat)) {
      svgArr.push(filename + '#' + cap[1]);

      content = content.substring(cap[0].length + cap.index);

    }
  }

});


// currently only move js around
gulp.task('copy', () => {

  let toMove = [
    '*.js',
    'index.html',
    'main.css'
  ];

  // also move svg sprites
  let sprites = [];
  if (config.svgDir) {
    config.svgDir.forEach((dir) => {
      sprites.push(dir + spriteSuffix + '.svg');
    });
  }
  sprites = sprites.concat(config.svgSprite || []);

  toMove = toMove.concat(sprites);

  // append src dir name to each ele
  toMove.forEach((filename, index, arr) => {
    arr[index] = srcDir + '/' + filename;
  });

  return gulp.src(toMove)
    .pipe(gulp.dest('dest'));
});

gulp.task('serve', () => {
  let express = require('express');
  let app = express();
  let dir = destDir;

  let port = 3000;

  app.use('/', express.static(dir));

  var server = app.listen(port, 'localhost', () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Servring in %s at http://%s:%s', dir, host, port);
  });
});

gulp.task('default', ['sprite', 'injectSvgName', 'sass', 'sasses', 'copy']);

// gulp.task('sass', function () {
//   gulp.src('sass/main.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'))
//     .pipe(browserSync.stream());
// });
//
// gulp.task('serve', function () {
//   browserSync.init({
//     server: {
//       baseDir: './'
//     }
//   });
//
//   gulp.watch('./*.html').on('change', browserSync.reload);
//   gulp.watch('./js/**/*.js').on('change', browserSync.reload);
// });
//
// gulp.task('sass:watch', function () {
//   gulp.watch('sass/**/*.scss', ['sass']);
// });
//
// gulp.task('default', ['serve', 'sass', 'sass:watch']);
