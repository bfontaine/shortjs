// This is the Angular version of short.js.

angular.module("bfn.short", []).
  filter("short", function() {

    return function (text) { return short(text); };

  });
