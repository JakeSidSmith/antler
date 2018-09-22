import path from 'path';
import { RegexRule } from '../regex-rule';
import { Node } from '../types';

export class DirectoryName extends RegexRule {
  protected getName() {
    return 'DirectoryName';
  }

  protected shouldRun (node: Node) {
    return node.isDirectory;
  }

  protected getPart (node: Node) {
    return path.basename(node.path);
  }
}
