export type Level = 'off' | 'warning' | 'error';

export interface Config {
  readonly rules: Rules;
}

export interface Rules {
  readonly [i: string]: Level | RuleConfig;
}

export interface RuleConfig {
  readonly level?: Level;
  readonly options?: RuleOptions;
}

export interface RuleOptions {
  readonly [i: string]: string | ReadonlyArray<string>;
}
