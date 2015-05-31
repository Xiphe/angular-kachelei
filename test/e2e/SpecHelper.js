'use strict';

var port = process.env.E2E_SANDBOX_PORT || 8765;
var sandboxUrl = 'http://localhost:' + port + '/';

beforeEach(function() {
  browser.get(sandboxUrl);
});

exports.kachelei = {
  container: function() {
    return element.all(by.css('[kachelei]'));
  },
  kacheln: function() {
    return element.all(by.css('[kachel]'));
  },
  manipulateButtons: function() {
    return element.all(by.css('[test-manipulation]'));
  }
};

exports.thingsStringInput = {
  set: function(string) {
    exports.thingsStringInput.getElm().clear().sendKeys(string);
  },
  getElm: function() {
    return element(by.model('thingsString'));
  }
};

exports.times = function(count, cb) {
  for (var i = 0; i < count; i += 1) {
    cb();
  }
};
