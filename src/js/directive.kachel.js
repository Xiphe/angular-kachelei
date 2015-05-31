/* global app */
app.directive('kachel', function() {
  'use strict';

  return {
    restrict: 'A',
    scope: {
      x: '=kx',
      y: '=ky'
    },
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
          x: scope.x,
          y: scope.y
        }
      };

      kachelei.add(kachel, scope.$parent.$index);
      scope.$on('$destroy', function() {
        kachelei.remove(kachel);
      });
    }
  };
});
