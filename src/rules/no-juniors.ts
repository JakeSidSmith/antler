import path from 'path';
import { Rule } from '../rule';
import { Node } from '../types';

const MATCHES_EXTENSION_LIKE = /\..+/;

export class NoJuniors extends Rule {
  public run (node: Node) {
    if (
      node.name === node.parentName ||
      node.name.replace(path.extname(node.name), '') === node.parentName ||
      node.name.replace(MATCHES_EXTENSION_LIKE, '') === node.parentName
    ) {
      this.report(`File at ${node.path} matches its parent's name - ${node.parentName}`);
    }
  }

  protected getName () {
    return 'NoJuniors';
  }
}
