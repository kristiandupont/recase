export declare type Casing =
  | "dash"
  | "screamingDash"
  | "snake"
  | "screamingSnake"
  | "camel"
  | "pascal"
  | "prose"
  | "capitalProse";

export declare type WideCasing = Casing | "mixed" | null;

export function recase(from: WideCasing, to: Casing, str: string): string;
export function recase(from: WideCasing, to: Casing): (str: string) => string;
export function recase(from: WideCasing): (to: Casing, str: string) => string;
export function recase(
  from: WideCasing
): (to: Casing) => (str: string) => string;

export function detectCasing(str: string): WideCasing;

export declare const parsers: Record<WideCasing, (str: string) => string[]>;
export declare const composers: Record<Casing, (arr: string[]) => string>;
