/* global app */
app.factory('kRect', function() {
  return function(element) {
    var rect = {};
    var originalRect = element.getBoundingClientRect();

    rect.bottom = originalRect.bottom;
    rect.top = originalRect.top;
    rect.right = originalRect.right;
    rect.left = originalRect.left;
    rect.height = originalRect.height || originalRect.bottom - originalRect.top;
    rect.width = originalRect.width || originalRect.right - originalRect.left;

    return rect;
  };
});
