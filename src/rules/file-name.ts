import path from 'path';
import { RegexRule } from '../regex-rule';
import { Node } from '../types';

export class FileName extends RegexRule {
  protected getName() {
    return 'FileName';
  }

  protected shouldRun (node: Node) {
    return !node.isDirectory;
  }

  protected getPart (node: Node) {
    return path.basename(node.path);
  }
}
