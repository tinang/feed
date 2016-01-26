# Tweet Trend Mini App
Render tweets by trend

## Development

```
git clone git@github.com:tinang/tweetapp.git
sudo npm install
sudo npm update -g bower // skip if version is from 1.7.1
bower install
gulp default // including these tasks: webpack, styles, templates, copy, stuffs
gulp serve // serve app if it's any js/css/html change

```

## Production

Just copy `dist` folder to your root path

## Demo



## More Detail

1. Main desired technologies/components
  * AngularJS for front-end UI
  * Bootstrap Sass with custom variables `bootstrap-custom-variables.scss`
  * Animate.css is a cross-browser library of CSS animations
  * Gulp and its plugins
  * Others: check out detail on `package.json` and `bower.json`

2. What's inside development **dev**?
  * **dev** is used for development project with structural
  * `index.html` is main template file, the default starting point
  * `app.js` is the main javascript file, init app, includes necessary components, define states
  * `styles` folder is all sass css files
  * others are separated components

3. What's inside production **dist**?
  * `index.html` is main template file, the default starting point
  * `app.js` is the main javascript file. `gulp webpack` task will minimize all js files to `app.js`
  * The same for `main.scss`, this file includes all necessary css files and compile to `main.css` by `gulp styles` task
  * All templates (html file) will be compiled to `templates.js` by `gulp templates` tasks