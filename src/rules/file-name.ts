import fs from 'fs';
import path from 'path';
import { RegexRule } from '../regex-rule';

export class FileName extends RegexRule {
  protected getName() {
    return 'FileName';
  }

  protected shouldRun (resolvedPath: string) {
    return fs.lstatSync(resolvedPath).isFile();
  }

  protected getPart (resolvedPath: string) {
    return path.basename(resolvedPath);
  }
}
