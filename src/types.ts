export interface Config {
  readonly rules: Rules;
}

export interface Rules {
  readonly [i: string]: RuleConfig;
}

export type RuleConfig = number | string | [number | string, RuleOptions];

export type RuleOptions = string | number | RuleOptionsObject;

export interface RuleOptionsObject {
  readonly [i: string]: string | ReadonlyArray<string>;
}
