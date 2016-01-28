# Tweet Trend Mini App
Render tweets by hashtag

## Development
```
git clone git@github.com:tinang/tweetapp.git
sudo npm install
sudo npm update -g bower // skip if version is from 1.7.5
bower install
gulp default // including these tasks: webpack, styles, templates, copy, stuffs
gulp serve // serve app if it's any js/css/html change

```

## Production
After running `gulp default`, production `dist` will be created, then just copy `dist` folder and run app

## Demo
Please **allow popup** to provide authorized access to Twitter Api.
Check `demo` [here] (http://tinang.github.io/tweetapp/demo "Demo")

## More Detail

1. Main desired technologies/components
  * AngularJS for front-end UI
  * Bootstrap Sass with custom variables `bootstrap-custom-variables.scss`
  * Animate.css is a cross-browser library of CSS animations
  * Gulp and its plugins for development tools
  * Bower to install third-party libraries
  * Detail third-party libraries: check out detail on `package.json` and `bower.json`

2. What's inside development **dev**?
  * **dev** is used for development project with separated modules
  * `index.html` is the default starting point
  * `app.js` is the main javascript file, init app, includes necessary components, define states
  * `styles` folder is all sass css files with `main.scss` includes sass files, `style/styles.scss` is main custom style for app
  * `home` folder is root component, includes navigation, state content, bottom section
  * `feed` folder
      * `service.js` defines feed services such as get list hashtags, get tweets by hashtag
      * `list.js` is main controller for state `feed`
      * `list.html` is template file to display tweet data
  * `dummy` is json file contains dummy hashtags

3. What's inside production **dist**?
  * `index.html` is main template file, the default starting point
  * `app.js` is the main javascript file. `gulp webpack` task will minimize all js files to `app.js`
  * `main.scss`, this file includes all necessary css files and compile to `main.css` by `gulp styles` task
  * `templates.js` is compiled from all templates (html files) by `gulp templates` tasks
  * `js`, `images`, `dummy`, `fonts` are stuff folders