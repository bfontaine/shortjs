# Short.js

**Short.js** is a small library that shortens text in JS, and that’s all. It
currently only support numbers.

## Usage

Note: this is an alpha release, there’re no unit tests and it's only partially
hand-tested for now. I just wanted a small lib for something I coded quite a
few times in different projects.

### VanillaJS

Include `short.js`, then use it:

```js
console.log(short("foo bar"))    // => "foo bar"
console.log(short("42"))         // => "42"
console.log(short("42452"))      // => "42.1k"
console.log(short("721452"))     // => "0.7M"
console.log(short("1000721452")) // => "1.0G"
```

### Angular

Include `bfn-short.js` after Angular then add it in your app:

```js
angular.module("yourApp", ["bfn.short"]).
  controller("foo", function() {
    // ...
  });
```

The module exposes only one filter:

```html
<span>{{ thenumber | short }}</span>
```

### jQuery

Include `jquery.short.js` after jQuery then use it:

```js
// replace the text of all elements of class 'myselector' using short.js
$(".myselector").short();
```
