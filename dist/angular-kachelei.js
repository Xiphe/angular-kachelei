/*!
 * angular-kachelei v0.0.0
 * https://github.com/Xiphe/angular-kachelei
 *
 * tile-layouts for angular
 *
 * Copyright 2015, Hannes Diercks <kachelei@xiphe.net>
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/helper.module.js
  var app = angular.module('kachelei', []);

  // src/js/constant.config.js
  app.constant('kachelConfig', {
    ratio: 1,
    maxWidth: 200,
    gap: 20
  });

  // src/js/directive.kachel.js
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

  // src/js/directive.kachelei.js
  app.directive('kachelei', ['kDebounce', 'kRect', 'kPlacer', 'kachelConfig', '$window', function(
      kDebounce,
      kRect,
      kPlacer,
      kachelConfig,
      $window
    ) {
    return {
      restrict: 'A',
      controller: ['$scope', '$element', function($scope, $element) {
        var kacheln = [];

        $element.css({
          position: 'relative'
        });

        this.add = function(kachel) {
          kacheln.push(kachel);
          debouncedLayout();
        };

        function getKachelCount(containerWidth) {
          var count = 1;

          /* how much kacheln fit the container? */
          while ((kachelConfig.maxWidth * count + kachelConfig.gap * (count - 1)) < containerWidth) {
            count++;
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
            var heightPx = height * size * kachelConfig.ratio + (height - 1) * gap;
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

        };

        var debouncedLayout = kDebounce(layout, 0);

        angular.element($window).on('resize', kDebounce(layout, 20));
      }]
    };
  }]);

  // src/js/factory.debounce.js
  // http://davidwalsh.name/function-debounce
  app.factory('kDebounce', function() {
    return function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      };
    };
  });

  // src/js/factory.placer.js
  app.factory('kPlacer', function() {
    var kPlacer = {};

    kPlacer.find = function(matrix, width, height) {
      var foundX;
      var skip = 0;
      var row = 0;
      while (true) {
        if (typeof matrix[row] === 'undefined') {
          return [0, row];
        }

        foundX = kPlacer.findX(matrix[row], width, skip);

        if (typeof foundX === 'undefined') {
          skip = 0;
          row++;
          continue;
        }

        if (kPlacer.fitsY(matrix, foundX, row, width, height)) {
          return [foundX, row];
        } else {
          skip++;
        }
      }
    };

    kPlacer.findX = function(row, width, skip) {
      var found;
      for (var i = 0, l = row.length; i < l; i++) {
        found = true;
        for (var ii = 0; ii < width; ii++) {
          found = found && row[i + ii] === false;
        }
        if (found) {
          if (skip) {
            skip--;
          } else {
            return i;
          }
        }
      }
    };

    kPlacer.fitsY = function(matrix, x, y, width, height) {
      if (height === 1) {
        return true;
      }

      var fits = true;
      for (var i = 0; i < height; i++) {
        if (typeof matrix[y + i] === 'undefined') {
          return true;
        }

        for (var ii = 0; ii < width; ii++) {
          fits = fits && !matrix[y + i][x + ii];
        }
        if (!fits) {
          return false;
        }
      }

      return true;
    };

    kPlacer.newRow = function(size) {
      var line = [];
      for (var i = 0; i < size; i++) {
        line.push(false);
      }
      return line;
    };

    kPlacer.mark = function(matrix, x, y, width, height, countX) {
      for (var i = 0; i < height; i++) {
        if (typeof matrix[y + i] === 'undefined') {
          matrix.push(kPlacer.newRow(countX));
        }

        for (var ii = 0; ii < width; ii++) {
          matrix[y + i][x + ii] = true;
        }
      }

      return matrix;
    };

    return kPlacer;
  });

  // src/js/factory.rect.js
  app.factory('kRect', function() {
    return function(element) {
      var rect = angular.extend({}, element.getBoundingClientRect());
      rect.height = rect.height || rect.bottom - rect.top;
      rect.width = rect.width || rect.right - rect.left;
      return rect;
    };
  });

  // /Users/hannesdiercks/Sites/kachelei/node_modules/grunt-angular-toolbox/.tmp/ng_templates.js

})(window.angular);
