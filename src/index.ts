import fs from 'fs';
import path from 'path';

const CWD = process.cwd();

export function crawl (filePath: string, indent = '') {
  const resolvedPath = path.resolve(CWD, filePath);

  console.log(`${indent}${path.basename(resolvedPath)}`);

  if (fs.lstatSync(resolvedPath).isDirectory()) {
    fs.readdirSync(resolvedPath).forEach((subFilePath) => {
      crawl(path.resolve(resolvedPath, subFilePath), `  ${indent}`);
    });
  }
}
