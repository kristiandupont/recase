# RECASE

Change and detect the casing of a string.

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
recase(from, to, str)
```

Takes two casing parameters which can both be one of `dash`, `snake`, `camel` or `pascal`. Additionally,
`from` can be `mixed` or null which will make all word boundaries considered.
The third parameter is the string to recase.


## detectCasing
```javascript
detectCasing(str)
```

Takes a string that has been formatted. It will attempt to detect the casing.

## Casings

 - `dash`: `example-string`
 - `snake`: `example_string`
 - `camel`: `exampleString`
 - `pascal`: `ExampleString`
