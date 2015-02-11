/* global app */
app.factory('kRect', function() {
  return function(element) {
    var rect = angular.extend({}, element.getBoundingClientRect());
    rect.height = rect.height || rect.bottom - rect.top;
    rect.width = rect.width || rect.right - rect.left;
    return rect;
  };
});
