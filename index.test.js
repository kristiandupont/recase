import { xprod } from "ramda";
import { describe, expect, it } from "vitest";

const { recase, detectCasing } = require(".");

const examples = {
  dash: "lorem-ipsum-dolor-sit-amet",
  screamingDash: "LOREM-IPSUM-DOLOR-SIT-AMET",
  snake: "lorem_ipsum_dolor_sit_amet",
  screamingSnake: "LOREM_IPSUM_DOLOR_SIT_AMET",
  camel: "loremIpsumDolorSitAmet",
  pascal: "LoremIpsumDolorSitAmet",
  prose: "lorem ipsum dolor sit amet",
};

const casings = Object.keys(examples);

describe("recase", () => {
  xprod(casings, casings).forEach(([from, to]) =>
    it(`should recase from ${from} to ${to}`, () => {
      const source = examples[from];
      const expected = examples[to];
      expect(recase(from, to, source)).toBe(expected);
    })
  );

  it("should curry", () => {
    const fromPascal = recase("pascal");
    expect(fromPascal("dash", "SomePascalCasedString")).toBe(
      "some-pascal-cased-string"
    );

    const pascalToSnake = fromPascal("snake");
    expect(pascalToSnake("PasString")).toBe("pas_string");
  });

  it("should accept mixed input", () => {
    expect(recase("mixed", "dash", "Some_Mixed-inputString")).toBe(
      "some-mixed-input-string"
    );

    // Curry with null which defaults to "mixed"
    const toCase = recase(null);
    expect(toCase("snake", "InputString")).toBe("input_string");
    expect(toCase("dash", "input_string")).toBe("input-string");
  });

  it("should retain consecutive uppercase letters (issue #82)", () => {
    expect(recase("snake", "pascal", "FOObar_baz")).toBe("FOObarBaz");
  });
});

describe("detectCasing", () => {
  [
    ...casings.map((casing) => [examples[casing], casing]),
    ["Mixed-casing", "mixed"],
    ["unknown", null],
    ["", null],
  ].forEach(([source, expected]) =>
    it(`should detect casing in '${source}'`, () => {
      expect(detectCasing(source)).toBe(expected);
    })
  );
});
