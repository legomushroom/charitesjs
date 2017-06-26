var helpers = mojs.__helpers__;
var staggerProperty = helpers.staggerProperty;

var eps = 0.0000001;

describe('`staggerProperty` ->', function () {
  it('should parse `array` values', function () {
    var array = [11, 20, 13, 45, 25];

    for (var i = 0; i < 3*array.length; i++) {
      expect(staggerProperty(array, i)).toBeDefined();
      expect(staggerProperty(array, i)).toBe(array[i % array.length]);
    }
  });

  it('should parse `function` values', function () {
    var coef = Math.random();

    var fun = function(index) {
      return index*coef;
    };

    fun.__mojs__isStaggerFunction = true;

    for (var i = 0; i < 22; i++) {
      expect(staggerProperty(fun, i)).toBeDefined();
      expect(staggerProperty(fun, i)).toBe(i*coef);
    }
  });

  it('should parse plain `function` values', function () {
    var coef = Math.random();

    var fun = function(index) {
      return index*coef;
    };

    for (var i = 0; i < 22; i++) {
      expect(staggerProperty(fun, i)).toBe(fun);
    }
  });

  it('should parse `single` values', function () {
    for (var i = 0; i < 20; i++) {
      var prop = Math.random();
      expect(staggerProperty(prop, i)).toBeDefined();
      expect(staggerProperty(prop, i)).toBe(prop);
    }
  });

  it('should parse `stagger` values', function () {
    expect(staggerProperty('stagger(10, 50)', 0)).toBe(10);
    expect(staggerProperty('stagger(10, 50)', 1)).toBe(60);
    expect(staggerProperty('stagger(10, 50)', 2)).toBe(110);
  });

  it('should parse `stagger` values #in map', function () {
    var value = [ 'stagger(10, 50)', 'stagger(0, 25)']
    expect(staggerProperty(value, 0)).toBe(10);
    expect(staggerProperty(value, 1)).toBe(25);
    expect(staggerProperty(value, 2)).toBe(110);
    expect(staggerProperty(value, 3)).toBe(75);
  });

});
