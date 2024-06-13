const { head, tail, pipe, curry } = require("ramda");

/**
 * @typedef {'dash'|'screamingDash'|'snake'|'screamingSnake'|'camel'|'pascal'|'prose'} Casing
 * @typedef {Casing|'mixed'} WideCasing
 */

const lowerCase = (s) => s.toLowerCase();
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const trimSeparators = (s) => s.replace(/^(\-|_)+|(\-|_)+$/g, "");

const parsers = {
  dash: (s) => s.split("-"),
  screamingDash: (s) => s.split("-"),
  snake: (s) => s.split("_"),
  screamingSnake: (s) => s.split("_"),
  camel: (s) => s.split(/(?=[A-Z])/),
  pascal: (s) => s.split(/(?=[A-Z])/),
  prose: (s) => s.split(" "),
  mixed: (s) =>
    s
      .split(/(?=[A-Z\-_])/)
      .map(trimSeparators)
      .filter(Boolean),
};

const composers = {
  dash: (a) => a.map(lowerCase).join("-"),
  screamingDash: (a) => a.map(lowerCase).join("-").toUpperCase(),
  snake: (a) => a.map(lowerCase).join("_"),
  screamingSnake: (a) => a.map(lowerCase).join("_").toUpperCase(),
  camel: (a) => [head(a).toLowerCase(), ...tail(a).map(capitalize)].join(""),
  pascal: (a) => a.map(capitalize).join(""),
  prose: (a) => a.map(lowerCase).join(" "),
};

/**
 * @param {WideCasing} [from] source casing. If falsy or "mixed", it will split by all word boundaries
 * @param {Casing} to target casing.
 * @param {string} str string to recase
 */
const recase = curry((from, to, str) =>
  from === to ? str : pipe(parsers[from || "mixed"], composers[to])(str)
);

/**
 * @param {string} str
 * @returns {WideCasing | null} returns detected casing or null if unknown
 */
const detectCasing = (str) => {
  /** @type {WideCasing | null} */
  let result = null;

  /** @type {'none'|'upper'|'lower'|'mixed'} */
  let letterCase = "none";
  if (str.trim() !== "") {
    letterCase =
      str === str.toLowerCase()
        ? "lower"
        : str === str.toUpperCase()
          ? "upper"
          : "mixed";
  }

  if (str.indexOf("_") !== -1) {
    if (letterCase === "upper") {
      result = "screamingSnake";
    } else {
      result = "snake";
    }
  }

  if (str.indexOf("-") !== -1) {
    if (result) {
      return "mixed";
    }
    if (letterCase === "upper") {
      result = "screamingDash";
    } else {
      result = "dash";
    }
  }

  if (str.indexOf(" ") !== -1) {
    if (result) {
      return "mixed";
    }
    result = "prose";
  }

  if (letterCase === "mixed") {
    if (result) {
      return "mixed";
    }
    // Name has uppercase letters. Check if first letter is uppercase.
    const firstLetter = str.charAt(0);
    result = firstLetter === firstLetter.toLowerCase() ? "camel" : "pascal";
  }

  return result;
};

module.exports = {
  recase,
  detectCasing,
};
