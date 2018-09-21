import fs from 'fs';
import path from 'path';

const CWD = process.cwd();

function crawl (filePath: string, indent = '') {
  const resolvedPath = path.resolve(CWD, filePath);

  if (fs.lstatSync(resolvedPath).isDirectory()) {
    fs.readdirSync(resolvedPath).forEach((subFilePath) => {
      crawl(path.resolve(resolvedPath, subFilePath), `  ${indent}`);
    });
  }
}

export default crawl;
