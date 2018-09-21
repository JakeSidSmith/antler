import Rule from './rule';
import { RuleConfig } from './types';

const VALID_KEYS = ['allow', 'disallow'];

abstract class RegexRule extends Rule {
  protected allow: RegExp | ReadonlyArray<RegExp>;
  protected disallow: RegExp | ReadonlyArray<RegExp>;

  public constructor (config: RuleConfig) {
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
        new RegExp(allow) :
        allow.map((pattern) => new RegExp(pattern));
      this.disallow = typeof disallow === 'string' ?
        new RegExp(disallow) :
        disallow.map((pattern) => new RegExp(pattern));
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

export default RegexRule;
