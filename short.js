(function( root, factory ) {

  if (typeof define == 'function' && define.amd) {
    define(factory);
  } else if (typeof exports == 'object') {
    module.exports = factory();
  } else {
    root.short = factory();
  }

})( this, function() {
  "use strict";

  var filters = [];

  var short = function short(text) {
    return short.filter( text );
  };

  short.addFilter = function addFilter( pattern, fn ) {
    filters.push([pattern, fn]);
  };

  short.filter = function filter( text ) {
    var len = filters.length,
        i = 0,
        f, res;

    for (; i<len; i++) {
      f = filters[i];

      if (f[0].test(text)) {
        res = f[1](text);
        if (res !== false) {
          text = res;
        }
      }
    }

    return text;
  };

  /* Builtin Filters */

  // short numbers
  short.addFilter(/^\d+(?:\.\d+)?$/, (function() {
    var units = [
          { suffix: "P", factor: 1e15 },
          { suffix: "T", factor: 1e12 },
          { suffix: "G", factor: 1e9 },
          { suffix: "M", factor: 1e6 },
          { suffix: "k", factor: 1e3 },
        ],

        unitsLen = units.length;

    for (var i=0; i<unitsLen; i++) {
      // if a number is higher than this number, we use this prefix. For 'k',
      // it's 600 (0.6k), for 'M' it's 600'000, etc.
      units[i].threshold = units[i].factor/10 * 6;
    }

    function roundOneDecimal( n ) {
      return (0|(n * 10)) / 10;
    }

    return function( text ) {
      var n = +text,
          unit;

      if (isNaN(n)) {
        return false;
      }

      for (var i=0; i<unitsLen; i++) {
        unit = units[i];

        if (n > unit.threshold) {
          return "" + roundOneDecimal(n/unit.factor) + unit.suffix;
        }
      }

      return "" + roundOneDecimal(n);
    };
  })());

  return short;

});
