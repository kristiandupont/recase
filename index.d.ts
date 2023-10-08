export declare type Casing = "dash" | "snake" | "camel" | "pascal";
export declare type WideCasing = Casing | "mixed" | null;

export function recase(from: WideCasing, to: Casing, str: string): string;
export function recase(from: WideCasing, to: Casing): (str: string) => string;
export function recase(from: WideCasing): (to: Casing, str: string) => string;
export function recase(
  from: WideCasing,
): (to: Casing) => (str: string) => string;

export function detectCasing(str: string): WideCasing;
