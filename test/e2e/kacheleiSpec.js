describe('kachelei', function() {
  var kachelei;

  beforeEach(function() {
    kachelei = require('./SpecHelper').kachelei;
  });

  it('should exist', function() {
    expect(kachelei.container().count()).toBe(1);
  });

  it('should have kacheln', function() {
    expect(kachelei.kacheln().count()).toBe(8);
  });
});
