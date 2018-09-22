import { Rule } from './rule';
import { Level, Node, RuleConfig } from './types';

const REGEX_FLAGS = 'i';
const VALID_KEYS = ['allow', 'disallow'];

export abstract class RegexRule extends Rule {
  protected allow?: RegExp | ReadonlyArray<RegExp>;
  protected disallow?: RegExp | ReadonlyArray<RegExp>;

  public constructor (config: Level | RuleConfig) {
    super(config);

    if (this.options) {
      if (!(('allow' in this.options) || ('disallow' in this.options))) {
        this.error(`Invalid option keys - must include one of ${VALID_KEYS.join(', ')}`);
      }

      for (const key in this.options) {
        if (VALID_KEYS.indexOf(key) < 0) {
          this.error(`Invalid key in options - ${key}`);
        } else if (!(typeof this.options[key] === 'string' || Array.isArray(this.options[key]))) {
          this.error(`Type of key ${key} must be a string or array of strings`);
        }
      }

      const {
        allow,
        disallow,
      } = this.options;

      if (typeof allow === 'string') {
        this.allow = new RegExp(allow, REGEX_FLAGS);
      } else if (Array.isArray(allow)) {
        this.allow = allow.map((pattern) => new RegExp(pattern, REGEX_FLAGS));
      }

      if (typeof disallow === 'string') {
        this.disallow = new RegExp(disallow, REGEX_FLAGS);
      } else if (Array.isArray(disallow)) {
        this.disallow = disallow.map((pattern) => new RegExp(pattern, REGEX_FLAGS));
      }

    } else {
      this.error('Invalid options - must be an object');
    }

  }

  public run (node: Node) {
    if (!this.shouldRun(node)) {
      return;
    }

    const part = this.getPart(node);

    if (this.allow instanceof RegExp) {
      if (!this.allow.test(part)) {
        return this.report(`${node.path} does not match allowed pattern - ${this.allow}`);
      }
    } else if (Array.isArray(this.allow)) {
      for (const allow of this.allow) {
        if (!allow.test(part)) {
          return this.report(`${node.path} does not match allowed pattern - ${allow}`);
        }
      }
    }

    if (this.disallow instanceof RegExp) {
      if (this.disallow.test(part)) {
        return this.report(`${node.path} matches disallowed pattern - ${this.disallow}`);
      }
    } else if (Array.isArray(this.disallow)) {
      for (const disallow of this.disallow) {
        if (disallow.test(part)) {
          return this.report(`${node.path} matches disallowed pattern - ${disallow}`);
        }
      }
    }
  }

  protected abstract getPart (node: Node): string;
  protected abstract shouldRun (node: Node): boolean;
}
