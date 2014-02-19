(function() {
  exports.config = {
    chromeOnly: true,
    chromeDriver: "./node_modules/protractor/selenium/chromedriver",
    capabilities: {
      browserName: "chrome"
    },
    specs: ["tests/e2e/**/*.coffee"],
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000
    }
  };

}).call(this);
