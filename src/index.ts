import fs from 'fs';
import path from 'path';
import { AntlerError } from './antler-error';
import { CWD, MESSAGE_PREFIX } from './constants';
import { Rule } from './rule';

function crawl (filePath: string, indent: string, ruleInstances: ReadonlyArray<Rule>) {
  const resolvedPath = path.resolve(CWD, filePath);

  ruleInstances.forEach((instance) => {
    try {
      instance.run(resolvedPath);
    } catch (error) {
      const message = error && error.message ? error.message : error;
      console.error(`${MESSAGE_PREFIX}${message}`); // tslint:disable-line:no-console

      if (!(error instanceof AntlerError)) {
        process.exit(1);
      }
    }
  });

  if (fs.lstatSync(resolvedPath).isDirectory()) {
    fs.readdirSync(resolvedPath).forEach((subFilePath) => {
      crawl(path.resolve(resolvedPath, subFilePath), `  ${indent}`, ruleInstances);
    });
  }
}

export default crawl;
