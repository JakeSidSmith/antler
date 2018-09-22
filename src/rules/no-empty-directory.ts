import { Rule } from '../rule';
import { Node } from '../types';

export class NoEmptyDirectory extends Rule {
  public run (node: Node) {
    if (node.isDirectory && !node.childNames.length) {
      this.report(`Directory ${node.path} does not have any contents`);
    }
  }

  protected getName () {
    return 'NoEmptyDirectory';
  }
}
