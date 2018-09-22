import { Rule } from '../rule';
import { Node } from '../types';

const MATCHES_INDEX_FILE = /^index\./;

export class NoLonelyIndex extends Rule {
  public run (node: Node) {
    if (!node.isDirectory && MATCHES_INDEX_FILE.test(node.name) && node.siblingNamesIncludingSelf.length === 1) {
      this.report(`Lonely index file at ${node.path}`);
    }
  }

  protected getName () {
    return 'NoLonelyIndex';
  }
}
