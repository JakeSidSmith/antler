import Rule from './rule';
import { RuleConfig, RuleOptionsObject } from './types';

const VALID_KEYS = ['allow', 'disallow'];

abstract class RegexRule extends Rule {
  protected allow: RegExp | ReadonlyArray<RegExp>;
  protected disallow: RegExp | ReadonlyArray<RegExp>;

  public constructor (config: RuleConfig) {
    super(config);

    const {
      allow = '',
      disallow = '',
    } = this.options as RuleOptionsObject;

    this.allow = typeof allow === 'string' ?
      new RegExp(allow) :
      allow.map((pattern) => new RegExp(pattern));
    this.disallow = typeof disallow === 'string' ?
      new RegExp(disallow) :
      disallow.map((pattern) => new RegExp(pattern));
  }

  protected abstract getPart (resolvedPath: string): string;

  protected run (resolvedPath: string) {
    const part = this.getPart(resolvedPath);

    if (this.allow instanceof RegExp) {
      if (!this.allow.test(part)) {
        return this.report(`Does not match allowed pattern - ${this.allow}`);
      }
    } else if (Array.isArray(this.allow)) {
      for (const allow of this.allow) {
        if (!allow.test(part)) {
          return this.report(`Does not match allowed pattern - ${allow}`);
        }
      }
    }

    if (this.disallow instanceof RegExp) {
      if (!this.disallow.test(part)) {
        return this.report(`Matches disallowed pattern - ${this.disallow}`);
      }
    } else if (Array.isArray(this.disallow)) {
      for (const disallow of this.disallow) {
        if (!disallow.test(part)) {
          return this.report(`Matches disallowed pattern - ${disallow}`);
        }
      }
    }
  }

  protected validateOptions (options: RuleOptionsObject) {
    if (!Object.keys(options).length) {
      return this.report('No keys in options');
    }

    for (const key in options) {
      if (VALID_KEYS.indexOf(key) < 0) {
        return this.report(`Invalid key in options - ${key}`);
      }
    }

    for (const key of VALID_KEYS) {
      if ((key in options) && !(typeof options[key] === 'string' || Array.isArray(options[key]))) {
        return this.report(`Type of key ${key} must be a string or array of strings`);
      }
    }
  }
}

export default RegexRule;
