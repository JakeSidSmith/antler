import fs from 'fs';
import path from 'path';
import { Config } from './types';

const CWD = process.cwd();

function crawl (filePath: string, indent: string, config: Config) {
  const resolvedPath = path.resolve(CWD, filePath);

  if (fs.lstatSync(resolvedPath).isDirectory()) {
    fs.readdirSync(resolvedPath).forEach((subFilePath) => {
      crawl(path.resolve(resolvedPath, subFilePath), `  ${indent}`, config);
    });
  }
}

export default crawl;
