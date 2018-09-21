import path from 'path';
import RegexRule from '../regex-rule';

export class Extension extends RegexRule {
  protected getName() {
    return 'Extension';
  }

  protected getPart (resolvedPath: string) {
    return path.extname(resolvedPath);
  }
}
