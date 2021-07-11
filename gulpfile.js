const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const svgstore = require('gulp-svgstore');
const webp = require('gulp-webp');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const del = require('del');
const csso = require('gulp-csso');
const jsmin = require('gulp-jsmin');
const htmlmin = require('gulp-htmlmin');
const ttf2woff = require("gulp-ttf2woff");
const ttfwoff2 = require("gulp-ttf2woff2");

let fs = require("fs");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const stylesbig = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.stylesbig = stylesbig;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

exports.html = html;

const fonts = () => {
  gulp.src("source/fonts/*.ttf")
  .pipe(ttf2woff())
  .pipe(gulp.dest("build/fonts/"));

  return gulp.src("source/fonts/*.ttf")
  .pipe(ttfwoff2())
  .pipe(gulp.dest("build/fonts/"));
}

exports.fonts = fonts;


// function fontsStyle() {
//   let file_content = fs.readFileSync('source/sass/blocks/fonts.scss');
//   if (file_content == "") {
//     fs.writeFile('source/sass/blocks/fonts.scss', "", cb);
//     return fs.readdir('build/fonts/', function (err, items) {
//       if (items) {
//         let c_fontname;
//         for (var i = 0; i < items.length; i++) {
//           let fontname = items[i].split(".");
//           fontname = fontname[0];
//           if (c_fontname != fontname) {
//             fs.appendFile(
//               'source/sass/blocks/fonts.scss',
//               '@include font("' +
//                 fontname +
//                 '", "' +
//                 fontname +
//                 '", "400", "normal");\r\n',
//               cb
//             );
//           }
//           c_fontname = fontname;
//         }
//       }
//     });
//   }
// }

// function cb() {}
// exports.fontsStyle = fontsStyle;



const img = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
}

exports.img = img;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const sprite = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest('build/img/'));
}

exports.sprite = sprite;

const imageWebp = () => {
  return gulp.src('source/img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('build/img/'))
}

exports.imageWebp = imageWebp;

const clean = () => {
  return del("build");
}

exports.clean = clean;

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*ico",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
}

exports.copy = copy;

const imgTask = gulp.series(
  sprite,
  img,
  imageWebp,
)

exports.imgTask = imgTask;

const build = gulp.series(
  clean,
  copy,
  html,
  fonts,
  styles,
  stylesbig,
  imgTask,
);

exports.build = build;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
}

exports.default = gulp.series(
  build, server, watcher
);
