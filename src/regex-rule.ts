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
