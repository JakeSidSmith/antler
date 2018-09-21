import fs from 'fs';
import path from 'path';
import { Rule } from './rule';

const CWD = process.cwd();

function crawl (filePath: string, indent: string, ruleInstances: ReadonlyArray<Rule>) {
  const resolvedPath = path.resolve(CWD, filePath);

  if (fs.lstatSync(resolvedPath).isDirectory()) {
    fs.readdirSync(resolvedPath).forEach((subFilePath) => {
      crawl(path.resolve(resolvedPath, subFilePath), `  ${indent}`, ruleInstances);
    });
  }
}

export default crawl;
