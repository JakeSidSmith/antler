import fs from 'fs';
import path from 'path';
import { RegexRule } from '../regex-rule';

export class DirectoryName extends RegexRule {
  protected getName() {
    return 'DirectoryName';
  }

  protected shouldRun (resolvedPath: string) {
    return fs.lstatSync(resolvedPath).isDirectory();
  }

  protected getPart (resolvedPath: string) {
    return path.basename(resolvedPath);
  }
}
