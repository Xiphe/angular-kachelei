/* global app */
app.directive('kachelei', function(
    kDebounce,
    kRect,
    kPlacer,
    kachelConfig,
    $window
  ) {

  'use strict';

  return {
    restrict: 'A',
    controller: function($scope, $element) {
      var kacheln = [];

      $element.css({
        position: 'relative'
      });

      this.add = function(kachel, position) {
        kacheln.splice(position, 0, kachel);
        debouncedLayout();
      };

      this.remove = function(kachel) {
        kacheln.splice(kacheln.indexOf(kachel), 1);
        debouncedLayout();
      };

      function getKachelCount(containerWidth) {
        var count = 1;

        /* how much kacheln fit the container? */
        while (kachelConfig.maxWidth * count + kachelConfig.gap * (count - 1) <
          containerWidth
        ) {
          count += 1;
        }

        return count;
      }

      function getKachelBaseSize(count, containerWidth) {
        var kachelWidth = 0;

        kachelWidth = (containerWidth - kachelConfig.gap * (count - 1)) / count;

        return kachelWidth;
      }

      var layout = function() {
        var containerWidth = kRect($element[0]).width;
        var count = getKachelCount(containerWidth);
        var size = getKachelBaseSize(count, containerWidth);
        var gap = kachelConfig.gap;

        var matrix = [];

        angular.forEach(kacheln, function(kachel) {
          var width = kachel.dimensions.x;
          var height = kachel.dimensions.y;

          /* make sure dimensions are not greater than we have space for */
          if (width > count) {
            width = count;
            height = Math.round(height * (count / kachel.dimensions.x)) || 1;
          }
          var place = kPlacer.find(matrix, width, height);

          kPlacer.mark(matrix, place[0], place[1], width, height, count);

          var widthPx = width * size + (width - 1) * gap;
          var heightPx = height * size * kachelConfig.ratio +
            (height - 1) * gap;
          var x = place[0] * size;
          if (place[0] > 0) {
            x += place[0] * gap;
          }
          var y = place[1] * size * kachelConfig.ratio;
          if (place[1] > 0) {
            y += place[1] * gap;
          }

          kachel.element.css({
            width: Math.round(widthPx) + 'px',
            height: Math.round(heightPx) + 'px',
            left: Math.round(x) + 'px',
            top: Math.round(y) + 'px'
          });

        });

        $scope.$broadcast('kLayout');
      };

      var debouncedLayout = kDebounce(layout, 0);

      angular.element($window).on('resize', kDebounce(layout, 20));
    }
  };
});
