var path = require("path");
var WebpackConfig = require('webpack-config');

// Karma configuration here
module.exports = function (config) {
  var needsCoverage = config.reporters.indexOf("coverage") > -1
  var needsJunit = config.reporters.indexOf("junit") > -1
  if(needsCoverage && process.env.COVERALLS_REPO_TOKEN) {
    config.reporters.push("coveralls")
  }
  config.reporters.push("jasmine-diff")
  config.set({
    port: 3334,
    browsers: ['PhantomJS'],
    // singleRun: true, //just run once by default
    frameworks: ['jasmine'], //use jasmine as framework
    files: [
      path.join(__dirname, 'node_modules', 'phantomjs-polyfill', 'bind-polyfill.js'), // To enable PhantomJS to render React components
      './src/__test__/**/*' //test files
    ],
    preprocessors: {
      './src/__test__/**/*': ['webpack', 'sourcemap']
    }

  })

  var webpack = new WebpackConfig().extend("webpack.test.config")

  if(needsJunit){
    config.set({
      junitReporter: {
        outputDir: path.join(process.env.CIRCLE_TEST_REPORTS || '$CIRCLE_TEST_REPORTS', "karma", "junit.xml"),
        useBrowserName: false // add browser name to report and classes names
      }
    })
  }
  if(needsCoverage){
    webpack = webpack.merge({
      module:{
        loaders: [{
          test: /\.(js|tsx?)/,
          exclude: /(test|node_modules|bower_components)/,
          loader: 'istanbul-instrumenter',
          enforce: "post"
        }]
      }
    })
    config.set({
      coverageReporter: {
        type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
        dir: 'coverage/'
      }
    })
  }
  config.set({
    webpack:webpack
  })

};
