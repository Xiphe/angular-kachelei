angular.module('demoApp', ['kachelei', 'ngAnimate']).run(function($rootScope) {
  'use strict';

  var things = {
    lorem: {
      headline: 'Lorem',
      x: 2,
      y: 1
    },
    dolor: {
      headline: 'Dolor',
      x: 4,
      y: 2
    },
    sit: {
      headline: 'Sit',
      x: 1,
      y: 2
    },
    ipsum: {
      headline: 'Ipsum',
      x: 2,
      y: 1
    },
    amed: {
      headline: 'Amed',
      x: 1,
      y: 2
    },
    foo: {
      headline: 'Foo',
      x: 2,
      y: 2
    },
    bar: {
      headline: 'Bar',
      x: 2,
      y: 1
    },
    baz: {
      headline: 'Baz',
      x: 1,
      y: 2
    }
  };

  $rootScope.things = [];
  $rootScope.thingsString = 'lorem,dolor,sit,ipsum,amed,foo,bar,baz';

  $rootScope.$watch('thingsString', function(newStr, oldStr) {
    if (newStr === oldStr && $rootScope.things.length) { return; }

    $rootScope.things.length = 0;
    newStr.split(',').forEach(function(thing) {
      if (things[thing]) {
        $rootScope.things.push(things[thing]);
      }
    });
  });

}).constant('kachelConfig', {
  ratio: 1,
  maxWidth: 250,
  gap: 20
}).directive('testManipulation', function() {
  'use strict';

  return {
    restrict: 'A',
    controller: function($scope, $element) {
      $scope.manipulate = function() {
        $element.text(Math.random());
      };
    }
  };
});
