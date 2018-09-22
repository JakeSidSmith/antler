export type Callback = () => void;

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
  readonly [i: string]: undefined | string | ReadonlyArray<string>;
}

export interface Node {
  readonly fullPath: string;
  readonly path: string;
  readonly name: string;
  readonly parentName: string;
  readonly isDirectory: boolean;
  readonly siblingNamesIncludingSelf: ReadonlyArray<string>;
  readonly childNames: ReadonlyArray<string>;
}
