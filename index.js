import { head, tail, pipe, curry } from 'ramda';

/**
 * @typedef {'dash'|'snake'|'camel'|'pascal'} Casing
 * @typedef {Casing|'mixed'} WideCasing
 */

const lowerCase = s => s.toLowerCase();
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
const trimSeparators = s => s.replace(/^(\-|_)+|(\-|_)+$/g, '');

const parsers = {
  dash: s => s.split('-'),
  snake: s => s.split('_'),
  camel: s => s.split(/(?=[A-Z])/),
  pascal: s => s.split(/(?=[A-Z])/),
  mixed: s =>
    s
      .split(/(?=[A-Z\-_])/)
      .map(trimSeparators)
      .filter(Boolean),
};

const composers = {
  dash: a => a.map(lowerCase).join('-'),
  snake: a => a.map(lowerCase).join('_'),
  camel: a => [head(a).toLowerCase(), ...tail(a).map(capitalize)].join(''),
  pascal: a => a.map(capitalize).join(''),
};

/**
 * @param {WideCasing} [from] source casing. If falsy or "mixed", it will split by all word boundaries
 * @param {Casing} to target casing.
 * @param {string} str string to recase
 */
const recase = curry((from, to, str) =>
  from === to ? str : pipe(parsers[from || 'mixed'], composers[to])(str)
);

/**
 * @param {string} str
 * @returns {WideCasing | null} returns detected casing or null if unknown
 */
const detectCasing = str => {
  /** @type {WideCasing | null} */
  let result = null;

  if (str.indexOf('_') !== -1) result = 'snake';

  if (str.indexOf('-') !== -1) {
    if (result) {
      return 'mixed';
    }
    result = 'dash';
  }

  if (str !== str.toLowerCase()) {
    if (result) {
      return 'mixed';
    }
    // Name has uppercase letters. Check if first letter is uppercase.
    const firstLetter = str.charAt(0);
    result = firstLetter === firstLetter.toLowerCase() ? 'camel' : 'pascal';
  }

  return result;
};

module.exports = {
  recase,
  detectCasing,
};
