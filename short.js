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
          { suffix: "k", factor: 10e3 },
          { suffix: "M", factor: 10e6 },
          { suffix: "G", factor: 10e9 },
          { suffix: "T", factor: 10e12 },
          { suffix: "P", factor: 10e15 },
        ],

        unitsLen = units.length;

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

        if (n > (unit.factor/10 * 6)) {
          return "" + roundOneDecimal(n/unit.factor) + unit.suffix;
        }
      }
    };
  })());

  return short;

});
