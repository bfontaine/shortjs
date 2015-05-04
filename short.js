/**! github.com/bfontaine/shortjs -- MIT license */
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

  var short = function short( text, opts ) {
    return short.filter( text, opts );
  };

  short.addFilter = function addFilter( pattern, fn ) {
    filters.push([pattern, fn]);
  };

  short.filter = function filter( text, opts ) {
    var len = filters.length,
        i = 0,
        f, res;

    opts = opts || {};

    for (; i<len; i++) {
      f = filters[i];

      if (f[0].test(text)) {
        res = f[1](text, opts);
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

    function roundOneDecimal( n ) {
      return (0|(n * 10)) / 10;
    }

    return function( text, opts ) {
      var n = +text,
          unit;

      if (isNaN(n)) {
        return false;
      }

      for (var i=0; i<unitsLen; i++) {
        unit = units[i];

        if (n >= unit.factor) {
          n = roundOneDecimal(n/unit.factor);

          if (n%1 === 0 && opts.forcePoint) {
              n = "" + n + ".0";
          }

          return "" + n + unit.suffix;
        }
      }

      return "" + roundOneDecimal(n);
    };
  })());

  return short;

});
