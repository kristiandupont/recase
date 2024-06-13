export declare type Casing =
  | "dash"
  | "screamingDash"
  | "snake"
  | "screamingSnake"
  | "camel"
  | "pascal"
  | "prose";
export declare type WideCasing = Casing | "mixed" | null;

export function recase(from: WideCasing, to: Casing, str: string): string;
export function recase(from: WideCasing, to: Casing): (str: string) => string;
export function recase(from: WideCasing): (to: Casing, str: string) => string;
export function recase(
  from: WideCasing
): (to: Casing) => (str: string) => string;

export function detectCasing(str: string): WideCasing;
