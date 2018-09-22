import fs from 'fs';
import path from 'path';
import { fileNameToPascalCase } from './__helpers__/file-name-to-pascal-case';

const MATCHES_INDEX_FILE = /^index\./;

describe('README.md', () => {
  it('should document all rules', () => {
    const readmeContents = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8');
    const rulesFiles = fs.readdirSync(path.resolve(__dirname, '../src/rules')).filter((name) => {
      return !MATCHES_INDEX_FILE.test(name);
    });
    const rulesClassNames = rulesFiles.map(fileNameToPascalCase);

    rulesClassNames.forEach((className) => {
      const regex = new RegExp(`^#+\\s${className}`, 'm');

      if (!regex.test(readmeContents)) {
        throw new Error(`No documentation for rule ${className}`);
      }
    });
  });
});
