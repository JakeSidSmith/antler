import { RegexRule } from '../regex-rule';
import { Node } from '../types';

export class Path extends RegexRule {
  protected getName() {
    return 'Path';
  }

  protected shouldRun () {
    return true;
  }

  protected getPart (node: Node) {
    return node.path;
  }
}
