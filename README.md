# RECASE

Change the casing of a string.

## Install
```
npm i @kristiandupont/recase
```

## Use
```javascript
const recase = require('@kristiandupont/recase');

const initialCase = 'snake';

const toCamel = recase(initialCase, 'camel');
const toDash = recase(initialCase, 'dash');

const s = 'some_string_Initially_set_with_snake_case';

console.log('Camel cased version:', toCamel(s));
// prints: "Camel cased version: someStringInitiallySetWithSnakeCase"

console.log('Dash cased version:', toDash(s));
// prints: "Dash cased version: some-string-initially-set-with-snake-case"
```

## recase
```javascript
recase(from, to)
```

Takes two casing parameters which can both be one of `dash`, `snake`, `camel` or `pascal`.
It returns a function that converts strings from the `from` casing to the `to` casing.


## detectCasing
```javascript
detectCasing(str)
```

Takes a string that has been formatted. It will attempt to detect the casing and return it according to the 


## Casings

 - `dash`: `example-string`
 - `snake`: `example_string`
 - `camel`: `exampleString`
 - `pascal`: `ExampleString`
