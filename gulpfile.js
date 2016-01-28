"use strict";

/* global console, require, __dirname */

var path                = require("path");
var gulp                = require("gulp");
var browserSync         = require("browser-sync");
var jshint              = require("gulp-jshint");
var modRewrite          = require("connect-modrewrite");
var webpack             = require("webpack-stream");
var gIf                 = require("gulp-if");
var templateCache       = require("gulp-angular-templatecache");  // Concatenates templates in the $templateCache
var autoprefixer        = require("gulp-autoprefixer");           // Parse CSS and add vendor prefixes to rules by `Can I Use`
var sass                = require("gulp-ruby-sass");              // Compile Sass to CSS with Ruby Sass
var combineMediaQueries = require("gulp-combine-media-queries");  // Combine matching media queries into one
var cssimport           = require("gulp-cssimport");              // Finds imports, grabs the content of the linked file and replaces the import statement with it
var csso                = require("gulp-csso");                   // Minify CSS with CSSO
var imagemin            = require("gulp-imagemin");               // Minify PNG, JPEG, GIF and SVG images
var pngquant            = require("imagemin-pngquant");

var webpackConfig = {
  context: path.join(__dirname, "dist"),
  cache:   true,
  bail:    true,
  devtool: "source-map",
  output:  {
    path:                          path.join(__dirname, "dev"),
    filename:                      "app.js",
    chunkFilename:                 "[chunkhash].js",
    devtoolModuleFilenameTemplate: "[resource-path]?[hash]"
  },
  resolve: {
    root: "dev",
    alias: {
      "angular":           "bower_components/angular/angular.min.js",
      "angular-sanitize":  "bower_components/angular-sanitize/angular-sanitize.min.js",
      "ui-router":         "bower_components/ui-router/release/angular-ui-router.js",
      "angular-bootstrap": "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
      "ng-twitter-api":    "bower_components/ng-twitter-api/dist/ng-twitter-api.min.js",
      "jsSHA":             "bower_components/jsSHA/src/sha1.js",
      "angular-growl":     "bower_components/angular-growl-2/build/angular-growl.min.js"
    }
  },
  plugins: [
    new webpack.webpack.optimize.DedupePlugin()
  ]
};

// jshint for js files
gulp.task("jshint", function () {
  return gulp.src(["dev/**/*.js"])
    .pipe(jshint())
    .pipe(gIf(!browserSync.active, jshint.reporter("fail")));
});

// Copy index.html to production
gulp.task("copy", function() {
  return gulp.src(["dev/index.html"]).pipe(gulp.dest("dist"));
});

var watching = false;

// Compile js files and merge to app.js
gulp.task('webpack', function() {
  if( ! watching) {
    /* UglifyJSPlugin is expensive, only run when we do not watch */
    webpackConfig.plugins.push(new webpack.webpack.optimize.UglifyJsPlugin());
  }

  var pack = gulp.src("dev/app.js")
    .pipe(webpack(webpackConfig));

  if(watching) {
    /* Do not crash gulp when watching */
    pack.on("error", function(err) {
      console.error(err.message);

      /* Keeps the pipe alive, despite the error, allowing webpack to
         resume packing upon new modified files */
      this.emit('end');
    });
  }

  return pack.pipe(gulp.dest("dist/"));
});

// Copy stuff such as fonts, images (optimize images before copy)
gulp.task("stuffs", function () {
  gulp.src('dev/images/*')
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(gulp.dest('dist/images'));

  gulp.src(["dev/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**"]).pipe(gulp.dest("dist/fonts/bootstrap"));
  gulp.src(["dev/dummy/**"]).pipe(gulp.dest("dist/dummy"));
  gulp.src(["dev/bower_components/oauth-js/dist/oauth.min.js"]).pipe(gulp.dest("dist/js"));

  return gulp.src(["dev/fonts/**"]).pipe(gulp.dest("dist/fonts"));
});

// Merge and compile template
gulp.task("templates", function() {
  return gulp.src(["dev/**/*.html", "!dev/bower_components/**/*"])
    .pipe(templateCache({
      module: "mokusApp",
      base:   path.join(__dirname, "dev"),
      templateHeader: "\"use strict\"; angular.module(\"<%= module %>\"<%= standalone %>).run([\"$templateCache\", function($templateCache) {"}))
    .pipe(gulp.dest("dist"));
});

// Compile sass
gulp.task("styles", function () {
  return sass("dev/styles/main.scss", {
      style: "compressed",
      precision: 3,
      loadPath: ["dev/styles"]
    })
    .on("error", console.error.bind(console))
    .pipe(autoprefixer({
      browsers: [
        "ie >= 9",
        "ie_mob >= 10",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 7",
        "opera >= 23",
        "ios >= 7",
        "android >= 4.4",
        "bb >= 10"
      ]
    }))
    .pipe(combineMediaQueries())
    .pipe(cssimport())
    .pipe(csso())
    .pipe(gulp.dest("dist"));
});

// Watch Files For Changes & Reload
gulp.task("serve", function () {
  watching = true;

  browserSync({
    notify: false,
    server: {
      baseDir: ["dist"],
      middleware: [
        modRewrite([
          "^[^\\.]*$ /index.html [L]"
        ])
      ]
    }
  });

  gulp.watch(["dev/**/*.html"], ["templates"]);
  gulp.watch(["dev/index.html"], ["copy"]);
  gulp.watch(["dev/app.js"], ["webpack", "jshint"]);
  gulp.watch(["dev/**/*.js"], ["webpack", "jshint"]);
  gulp.watch(["dev/styles/**/*.scss"], ["styles"], browserSync.reload);
  gulp.watch(["dist/app.js", "dist/templates.js", "dist/index.html"], browserSync.reload);
});

// Group all tasks to `default`
gulp.task("default", ["webpack", "templates", "styles", "stuffs", "copy"]);
