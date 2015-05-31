describe('kachelei', function() {
  'use strict';

  var specHelper = require('./SpecHelper');
  var kachelei = specHelper.kachelei;

  it('should exist', function() {
    expect(kachelei.container().count()).toBe(1);
  });

  it('should have kacheln', function() {
    expect(kachelei.kacheln().count()).toBe(8);
  });

  describe('kachel continuity', function() {
    // var thingsString = 'lorem,dolor,sit,ipsum,amed,foo,bar,baz';
    var input = specHelper.thingsStringInput;

    it('should be changable', function() {
      input.set('lorem,dolor,sit,amed,foo,bar,baz');
      expect(kachelei.kacheln().count()).toBe(7);
    });

    it(
      'should keep existing elements present while removing others',
      function() {
        var secondButton = kachelei.manipulateButtons().get(1);
        var manipulation;

        secondButton.click();

        manipulation = secondButton.getText();

        specHelper.times(27, function() {
          input.getElm().sendKeys(protractor.Key.BACK_SPACE);
        });
        specHelper.times(11, function() {
          input.getElm().sendKeys(protractor.Key.ARROW_LEFT);
        });
        specHelper.times(6, function() {
          input.getElm().sendKeys(protractor.Key.DELETE);
        });
        expect(
          kachelei.manipulateButtons().get(0).getText()
        ).toBe(manipulation);
      }
    );

    it('should keep existing elements present while adding others', function() {
      var manipulation;
      var button;

      input.set('amed');
      button = kachelei.manipulateButtons().get(0);

      button.click();

      manipulation = button.getText();

      specHelper.times(4, function() {
        input.getElm().sendKeys(protractor.Key.ARROW_LEFT);
      });
      input.getElm()
        .sendKeys(',')
        .sendKeys(protractor.Key.ARROW_LEFT)
        .sendKeys('lorem,dolor,sit');
      specHelper.times(5, function() {
        input.getElm().sendKeys(protractor.Key.ARROW_RIGHT);
      });
      input.getElm().sendKeys(',foo,bar,baz');

      expect(kachelei.manipulateButtons().get(3).getText()).toBe(manipulation);
    });
  });
});
