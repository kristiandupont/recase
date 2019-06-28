# RECASE

Change the casing of a string.

## Install
```
npm i @kristiandupont/recase
```

## Use
```javascript
const recase = require('@kristiandupont/recase');

const initialCase = 'snakeCase';

const toCamel = recase(initialCase, 'camelCase');
const toDash = recase(initialCase, 'dashCase');

const s = 'some_string_Initially_set_with_snake_case';

console.log('Camel cased version:', toCamel(s));
// prints: "someStringInitiallySetWithSnakeCase"

console.log('Dash cased version:', toDash(s));
// prints: "some-string-initially-set-with-snake-case"
```

## Reference
This module exposes one function:
```
recase(from, to)
```

It takes two casing parameters which can both be one of `dashCase`, `snakeCase`, `camelCase` or `pascalCase`.
It returns a function that converts strings from the `from` casing to the `to` casing.


## Casings

 - `dashCase`: `example-string`
 - `snakeCase`: `example_string`
 - `camelCase`: `exampleString`
 - `pascalCase`: `ExampleString`
