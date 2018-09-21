import fs from 'fs';
import path from 'path';

// import Extension from './rules/Extension';

// const RULES_MAP = {
//   Extension,
// };

const CWD = process.cwd();

function crawl (filePath: string, indent = '') {
  const resolvedPath = path.join(CWD, filePath);

  console.log(`${indent}${path.basename(resolvedPath)}`);

  if (fs.lstatSync(resolvedPath).isDirectory()) {
    fs.readdirSync(resolvedPath).forEach((subFilePath) => {
      crawl(path.join(resolvedPath, subFilePath), `  ${indent}`);
    });
  }
}

export default crawl;
