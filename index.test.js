const each = require('jest-each').default;
const { recase, detectCasing } = require('.');

describe('recase', () => {
  each([
    ['dash', 'dash', 'dash-cased-string', 'dash-cased-string'],
    ['dash', 'snake', 'dash-cased-string', 'dash_cased_string'],
    ['dash', 'camel', 'dash-cased-string', 'dashCasedString'],
    ['dash', 'pascal', 'dash-cased-string', 'DashCasedString'],
    ['snake', 'dash', 'snake_cased_string', 'snake-cased-string'],
    ['snake', 'snake', 'snake_cased_string', 'snake_cased_string'],
    ['snake', 'camel', 'snake_cased_string', 'snakeCasedString'],
    ['snake', 'pascal', 'snake_cased_string', 'SnakeCasedString'],
    ['camel', 'dash', 'camelCasedString', 'camel-cased-string'],
    ['camel', 'snake', 'camelCasedString', 'camel_cased_string'],
    ['camel', 'camel', 'camelCasedString', 'camelCasedString'],
    ['camel', 'pascal', 'camelCasedString', 'CamelCasedString'],
    ['pascal', 'dash', 'PascalCasedString', 'pascal-cased-string'],
    ['pascal', 'snake', 'PascalCasedString', 'pascal_cased_string'],
    ['pascal', 'camel', 'PascalCasedString', 'pascalCasedString'],
    ['pascal', 'pascal', 'PascalCasedString', 'PascalCasedString'],
  ]).it('should recase from %s to %s', (from, to, source, expected) => {
    expect(recase(from, to, source)).toBe(
      expected
    );
  });

  it('should curry', () => {
    const fromPascal = recase('pascal');
    expect(fromPascal('dash', 'SomePascalCasedString')).toBe('some-pascal-cased-string');

    const pascalToSnake = fromPascal('snake');
    expect(pascalToSnake('PasString')).toBe('pas_string');
  });

  it('should accept mixed input', () => {
    expect(recase('mixed', 'dash', 'Some_Mixed-inputString')).toBe('some-mixed-input-string');
    
    // Curry with null which defaults to "mixed"
    const toCase = recase(null);
    expect(toCase('snake', 'InputString')).toBe('input_string');
    expect(toCase('dash', 'input_string')).toBe('input-string');
  })
});

describe('detectCasing', () => {
  each([
    ['dash-cased', 'dash'],
    ['snake_cased', 'snake'],
    ['camelCased', 'camel'],
    ['PascalCased', 'pascal'],
    ['Mixed-casing', 'mixed'],
    ['unknown', null],
    ['', null]
  ]).it('should detect casing in %s', (source, expected) => {
    expect(detectCasing(source)).toBe(expected);
  })
})
