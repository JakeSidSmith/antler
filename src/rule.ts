import chalk from 'chalk';
import { AntlerError } from './antler-error';
import { AntlerWarning } from './antler-warning';
import { LEVELS } from './constants';
import { Level, Node, RuleConfig, RuleOptions } from './types';

export abstract class Rule {
  protected options?: RuleOptions;
  protected level: Level;

  public constructor (config: Level | RuleConfig) {
    if (typeof config === 'string') {
      this.setLevel(config);
    } else if (config && typeof (config as any) === 'object' && !Array.isArray(config)) {
      this.setLevel(config.level);
      this.setOptions(config.options);
    } else {
      this.error('Invalid config - must be a string or object');
    }
  }

  public abstract run(node: Node): void;

  protected abstract getName(): string;

  protected report (error: Error | string) {
    const message = (error instanceof Error) && error.message ? error.message : error;

    if (this.level === 'error') {
      throw new AntlerError(`${this.getName()}: ${message}`);
    } else if (this.level === 'warning') {
      throw new AntlerWarning(`${this.getName()}: ${message}`);
    }
  }

  protected error (error: Error | string) {
    const message = (error instanceof Error) && error.message ? error.message : error;

    throw new Error(chalk.red(`${this.getName()}: ${message}`));
  }

  private setLevel (level?: Level) {
    if (typeof level === 'string') {
      if (LEVELS.indexOf(level) < 0) {
        this.error(`Error level must be one of ${LEVELS.join(', ')}`);
      } else {
        this.level = level;
      }
    } else {
      this.error(`Error level must be one of ${LEVELS.join(', ')}`);
    }
  }

  private setOptions (options?: RuleOptions) {
    if (options && typeof (options as any) === 'object' && !Array.isArray(options)) {
      this.options = options;
    } else if (typeof options !== 'undefined') {
      this.error('Invalid options - must be an object');
    }
  }
}
