/* global app */
app.directive('kachel', function() {
  'use strict';

  return {
    restrict: 'A',
    priority: 200,
    require: '^kachelei',
    link: function(scope, element, attrs, kachelei) {
      if (!attrs.ngRepeat) {
        throw new Error(
          'kachel directive has to be on same element as ng-repeat'
        );
      }

      element.css({
        position: 'absolute'
      });

      var kachel = {
        element: element,
        dimensions: {
          x: scope.$eval(attrs.kx || 1),
          y: scope.$eval(attrs.ky || 1)
        }
      };

      kachelei.add(kachel, scope.$index);
      scope.$on('$destroy', function() {
        kachelei.remove(kachel);
      });
    }
  };
});
