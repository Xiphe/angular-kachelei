describe('placer', function() {
  'use strict';

  var kPlacer;

  beforeEach(function() {
    initGlobals();
    kPlacer = $injector.get('kPlacer');
  });

  describe('findX', function() {
    it('should exist', function() {
      expect(kPlacer.findX).toBeDefined();
    });

    it('should find a place for x1', function() {
      expect(kPlacer.findX([false, false, false], 1)).toBe(0);
    });

    it('should find another place for x1', function() {
      expect(kPlacer.findX([true, true, false], 1)).toBe(2);
    });

    it('should find a place for x2', function() {
      expect(kPlacer.findX([false, false, false], 2)).toBe(0);
    });

    it('should find another place for x2', function() {
      expect(kPlacer.findX([false, true, true, false, false], 2)).toBe(3);
    });

    it('should be able to skip', function() {
      expect(kPlacer.findX([false, true, false], 1, 1)).toBe(2);
    });

    it('should return undefined if it wont fit', function() {
      expect(kPlacer.findX([true, false, false], 3)).toBeUndefined();
    });
  });

  describe('fitsY', function() {
    it('should exist', function() {
      expect(kPlacer.fitsY).toBeDefined();
    });

    it('should early exit on y1', function() {
      expect(kPlacer.fitsY({}, 0, 0, 1, 1)).toBe(true);
    });

    it('should return true if it fits', function() {
      expect(kPlacer.fitsY([[false, false], [true, false]], 1, 0, 1, 2)).toBe(true);
    });

    it('should return true if it does not fit', function() {
      expect(kPlacer.fitsY([[false, false], [true, true]], 1, 0, 1, 2)).toBe(false);
    });

    it('should return true if it fits wich offset', function() {
      expect(kPlacer.fitsY([[true, true], [false, false], [true, false]], 1, 1, 1, 2)).toBe(true);
    });

    it('should check if a bigger kachel fits', function() {
      expect(kPlacer.fitsY([
        [true, false, true],
        [true, false, false],
        [true, false, false],
        [true, false, false]],
        1, 1, 2, 3
      )).toBe(true);
    });

    it('should check if a bigger kachel fits not', function() {
      expect(kPlacer.fitsY([
        [true, false, true],
        [true, false, false],
        [true, true, false],
        [true, false, false]],
        1, 1, 2, 3
      )).toBe(false);
    });
  });

  describe('find', function() {
    it('should exist', function() {
      expect(kPlacer.find).toBeDefined();
    });

    it('should return coordinates of the first place', function() {
      expect(kPlacer.find([], 1, 1)).toEqual([0, 0]);
    });

    it('should return coordinates of the first place', function() {
      expect(kPlacer.find([
        [true, false]
      ], 1, 1)).toEqual([1, 0]);
    });

    it('should return coordinates of the first place in a second row', function() {
      expect(kPlacer.find([
        [true, true],
        [true, false]
      ], 1, 1)).toEqual([1, 1]);
    });

    it('should return coordinates of the first place in a second row with y2', function() {
      expect(kPlacer.find([
        [true, true],
        [false, false],
        [true, false]
      ], 1, 2)).toEqual([1, 1]);
    });

    it('should return coordinates of the first place in a second row with y2 and x3', function() {
      expect(kPlacer.find([
        [false, true, false, false, true],
        [false, false, false, false, false],
        [false, true, false, false, false]
      ], 3, 2)).toEqual([2, 1]);
    });

    it('should find with not existent rows ', function() {
      expect(kPlacer.find([
        [true, false],
        [false, true]
      ], 1, 2)).toEqual([0, 1]);
    });
  });

  describe('newRow', function() {
    it('should create a new row', function() {
      expect(kPlacer.newRow(3)).toEqual([false, false, false]);
    });
  });

  describe('mark', function() {
    it('should exist', function() {
      expect(kPlacer.mark).toBeDefined();
    });

    it('should mark an area in a matrix', function() {
      expect(kPlacer.mark([], 0, 0, 1, 1, 3)).toEqual([[true, false, false]]);
    });

    it('should mark another area in a matrix', function() {
      expect(kPlacer.mark([
        [false, true, false, true, false, true],
        [false, true, false, true, false, true]
      ], 3, 2, 2, 2, 6)).toEqual([
        [false, true, false, true, false, true],
        [false, true, false, true, false, true],
        [false, false, false, true, true, false],
        [false, false, false, true, true, false]
      ]);
    });
  });
});
