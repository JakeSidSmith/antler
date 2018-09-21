import { Rule } from './rule';
import { Level, RuleConfig } from './types';

const REGEX_FLAGS = 'i';
const VALID_KEYS = ['allow', 'disallow'];

export abstract class RegexRule extends Rule {
  protected allow: RegExp | ReadonlyArray<RegExp>;
  protected disallow: RegExp | ReadonlyArray<RegExp>;

  public constructor (config: Level | RuleConfig) {
    super(config);

    if (this.options) {
      if (!(this.options.allow || this.options.disallow)) {
        this.report(`Invalid option keys - must include one of ${VALID_KEYS.join(', ')}`);
      }

      for (const key in this.options) {
        if (VALID_KEYS.indexOf(key) < 0) {
          this.report(`Invalid option key - ${key}`);
        }
      }

      const {
        allow = '',
        disallow = '',
      } = this.options;

      this.allow = typeof allow === 'string' ?
        new RegExp(allow, REGEX_FLAGS) :
        allow.map((pattern) => new RegExp(pattern, REGEX_FLAGS));
      this.disallow = typeof disallow === 'string' ?
        new RegExp(disallow, REGEX_FLAGS) :
        disallow.map((pattern) => new RegExp(pattern, REGEX_FLAGS));
    } else {
      this.report('Invalid options - must be an object');
    }

  }

  protected abstract getPart (resolvedPath: string): string;

  protected run (resolvedPath: string) {
    const part = this.getPart(resolvedPath);

    if (this.allow instanceof RegExp) {
      if (!this.allow.test(part)) {
        return this.report(`${part} does not match allowed pattern - ${this.allow}`);
      }
    } else if (Array.isArray(this.allow)) {
      for (const allow of this.allow) {
        if (!allow.test(part)) {
          return this.report(`${part} does not match allowed pattern - ${allow}`);
        }
      }
    }

    if (this.disallow instanceof RegExp) {
      if (!this.disallow.test(part)) {
        return this.report(`${part} matches disallowed pattern - ${this.disallow}`);
      }
    } else if (Array.isArray(this.disallow)) {
      for (const disallow of this.disallow) {
        if (!disallow.test(part)) {
          return this.report(`${part} matches disallowed pattern - ${disallow}`);
        }
      }
    }
  }
}
