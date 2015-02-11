/* global app */
app.directive('kachel', function() {
  return {
    restrict: 'A',
    scope: {
      x: '=kx',
      y: '=ky'
    },
    require: '^kachelei',
    link: function(scope, element, attrs, kachelei) {
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

      kachelei.add(kachel);
      scope.$on('$destroy', function() {
        kachelei.remove(kachel);
      });
    }
  };
});