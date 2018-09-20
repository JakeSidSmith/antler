import AntlerError from './antler-error';
import { LEVELS } from './constants';
import { RuleConfig, RuleOptions } from './types';

abstract class Rule {
  protected options: RuleOptions;
  protected level: number;

  public constructor (config: RuleConfig) {
    if (Array.isArray(config)) {
      this.level = this.getLogLevel(config[0]);
      this.options = config[1];
    } else if (typeof config === 'string' || typeof config === 'number') {
      this.level = 2;
      this.report('Invalid options, must be an object');
    } else {
      this.level = 2;
      this.report('Invalid config, must be a string, number, or array');
    }

    this.validateOptions(this.options);
  }

  protected abstract getName(): string;

  protected abstract validateOptions (options?: RuleOptions): void;

  protected abstract run(resolvedPath: string): void;

  protected report (error: Error | string) {
    throw new AntlerError(
      `${LEVELS[this.level]} ${this.getName()}: ${error instanceof Error ? error.message : error}`,
      this.level
    );
  }

  private getLogLevel(level?: number | string) {
    switch (level) {
      case 'off':
      case 0:
        return 0;
      case 'warning':
      case 1:
        return 1;
      case 'error':
      case 2:
      default:
        return 2;
    }
  }
}

export default Rule;
