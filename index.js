const R = require('ramda');

const lowerCase = s => s.toLowerCase();
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const parsers = {
  dashCase: s => s.split('-'),
  snakeCase: s => s.split('_'),
  camelCase: s => s.split(/(?=[A-Z])/),
  pascalCase: s => s.split(/(?=[A-Z])/),
};

const composers = {
  dashCase: a => a.map(lowerCase).join('-'),
  snakeCase: a => a.map(lowerCase).join('_'),
  camelCase: a =>
    [a[0].toLowerCase(), ...R.map(capitalize, R.tail(a))].join(''),
  pascalCase: a => R.map(capitalize, a).join(''),
};

/**
 * @param {'dashCase' | 'snakeCase' | 'camelCase' | 'pascalCase'} from
 * @param {'dashCase' | 'snakeCase' | 'camelCase' | 'pascalCase'} to
 * @return {(s: string) => string}
 */
const recase = (from, to) =>
  from === to
    ? R.identity
    : R.pipe(
        parsers[from],
        composers[to]
      );

module.exports = recase;
