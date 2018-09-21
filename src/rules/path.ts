import { RegexRule } from '../regex-rule';

export class Path extends RegexRule {
  protected getName() {
    return 'Path';
  }

  protected shouldRun () {
    return true;
  }

  protected getPart (resolvedPath: string) {
    return resolvedPath;
  }
}
