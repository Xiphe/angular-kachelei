/* global app */
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
