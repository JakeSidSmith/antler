import { AntlerError } from './antler-error';
import { LEVELS } from './constants';
import { Level, Node, RuleConfig, RuleOptions } from './types';

export abstract class Rule {
  protected options?: RuleOptions;
  protected level: Level;

  public constructor (config: Level | RuleConfig) {
    if (typeof config === 'string') {
      this.setLevel(config);
    } else if (config && typeof config === 'object' && !Array.isArray(config)) {
      this.setLevel(config.level);
      this.setOptions(config.options);
    } else {
      this.report('Invalid config - must be a string or object');
    }
  }

  public abstract run(node: Node): void;

  protected abstract getName(): string;

  protected report (error: Error | string) {
    throw new AntlerError(
      `${this.level.toUpperCase()} ${this.getName()}: ${error instanceof Error ? error.message : error}`,
      this.level
    );
  }

  private setLevel (level?: Level) {
    if (typeof level === 'string') {
      if (LEVELS.indexOf(level) < 0) {
        this.report(`Error level must be one of ${LEVELS.join(', ')}`);
      } else {
        this.level = level;
      }
    } else {
      this.level = 'error';
    }
  }

  private setOptions (options?: RuleOptions) {
    if (options && typeof options === 'object' && !Array.isArray(options)) {
      this.options = options;
    } else if (typeof options !== 'undefined') {
      this.report('Invalid options - must be an object');
    }
  }
}
