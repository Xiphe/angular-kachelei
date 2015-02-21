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
  }
};
