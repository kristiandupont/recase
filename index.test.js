const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { recase, detectCasing } = require(".");

const examples = {
  dash: "lorem-ipsum-dolor-sit-amet",
  screamingDash: "LOREM-IPSUM-DOLOR-SIT-AMET",
  snake: "lorem_ipsum_dolor_sit_amet",
  screamingSnake: "LOREM_IPSUM_DOLOR_SIT_AMET",
  camel: "loremIpsumDolorSitAmet",
  pascal: "LoremIpsumDolorSitAmet",
  prose: "lorem ipsum dolor sit amet",
  capitalProse: "Lorem Ipsum Dolor Sit Amet",
};

const casings = Object.keys(examples);

describe("recase", () => {
  for (const from of casings) {
    for (const to of casings) {
      it(`should recase from ${from} to ${to}`, () => {
        assert.equal(recase(from, to, examples[from]), examples[to]);
      });
    }
  }

  it("should curry", () => {
    const fromPascal = recase("pascal");
    assert.equal(
      fromPascal("dash", "SomePascalCasedString"),
      "some-pascal-cased-string"
    );

    const pascalToSnake = fromPascal("snake");
    assert.equal(pascalToSnake("PasString"), "pas_string");

    assert.equal(recase("pascal", "snake")("PasString"), "pas_string");
    assert.equal(recase("pascal")("snake")("PasString"), "pas_string");
  });

  it("should accept mixed input", () => {
    assert.equal(
      recase("mixed", "dash", "Some_Mixed-inputString"),
      "some-mixed-input-string"
    );

    // Curry with null which defaults to "mixed"
    const toCase = recase(null);
    assert.equal(toCase("snake", "InputString"), "input_string");
    assert.equal(toCase("dash", "input_string"), "input-string");
  });

  it("should retain consecutive uppercase letters (issue #82)", () => {
    assert.equal(recase("snake", "pascal", "FOObar_baz"), "FOObarBaz");
  });

  it("should split mixed input on spaces", () => {
    assert.equal(recase(null, "snake", "hello world"), "hello_world");
    assert.equal(recase(null, "snake", "Hello World"), "hello_world");
    assert.equal(recase(null, "dash", "some  mixed_Input"), "some-mixed-input");
  });

  it("should handle input with no words", () => {
    for (const to of casings) {
      assert.equal(recase(null, to, ""), "");
      assert.equal(recase(null, to, "---"), "");
    }
  });

  it("should throw on unknown casings", () => {
    assert.throws(() => recase("bogus", "camel", "foo"), /Unknown source casing "bogus"/);
    assert.throws(() => recase("snake", "bogus", "foo"), /Unknown target casing "bogus"/);
    assert.throws(() => recase("bogus", "bogus", "foo"), /Unknown source casing/);
    assert.throws(() => recase("snake", "toString", "foo"), /Unknown target casing/);
  });
});

describe("detectCasing", () => {
  for (const [source, expected] of [
    ...casings.map((casing) => [examples[casing], casing]),
    ["Mixed-casing", "mixed"],
    ["Foo_bar Baz", "mixed"],
    ["Foo-Bar Baz", "mixed"],
    ["123 456", "prose"],
    ["unknown", null],
    ["", null],
  ]) {
    it(`should detect casing in '${source}'`, () => {
      assert.equal(detectCasing(source), expected);
    });
  }
});
