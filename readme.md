#HTML Starter Kit Pro
[![Build Status](https://travis-ci.org/RainerAtSpirit/HTMLStarterKitPro.png?branch=master)](https://travis-ci.org/RainerAtSpirit/HTMLStarterKitPro)
### rough cut use on your own risk

Using grunt and grunt-jasmine for Durandal application testing.

1. install node from http://nodejs.org
2. install grunt using `npm install -g grunt-cli`
3. download/clone this repo
4. run `npm install` in its root directory to install grunt dependencies
5. run `grunt`, which will run `grunt jasmine:viewmodels` as default

After you run the test for the first time you'll find a `_SpecRunner.html` file in root directory, which can be opened
in the browser.

There are two test sets configured:

1. `grunt jasmine:viewmodels`: run specs for individual modules stored in app/viewmodels/*.js
2. `grunt jasmine:app`: run specs for app/main.js __Currently not working!__


