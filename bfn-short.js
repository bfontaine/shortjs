// This is the Angular version of short.js.

angular.module("bfontaine.short", []).
  filter("short", function() {

    return function (text) { return short(text); };

  });
