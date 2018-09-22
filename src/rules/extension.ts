import path from 'path';
import { RegexRule } from '../regex-rule';
import { Node } from '../types';

export class Extension extends RegexRule {
  protected getName() {
    return 'Extension';
  }

  protected shouldRun (node: Node) {
    return !node.isDirectory;
  }

  protected getPart (node: Node) {
    return path.extname(node.path);
  }
}
