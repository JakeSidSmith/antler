import fs from 'fs';
import path from 'path';
import * as rules from '../../src/rules';
import { fileNameToPascalCase } from '../__helpers__/file-name-to-pascal-case';

const MATCHES_INDEX_FILE = /^index\./;

describe('rules', () => {
  it('should export an object containing all rules', () => {
    const rulesFiles = fs.readdirSync(path.resolve(__dirname, '../../src/rules')).filter((name) => {
      return !MATCHES_INDEX_FILE.test(name);
    });
    const rulesClassNames = rulesFiles.map(fileNameToPascalCase);

    const exportedClassNames = Object.keys(rules);

    exportedClassNames.forEach((className) => {
      expect(rulesClassNames).toContain(className);
    });
  });

  it('should all return the name of their class from the getName method', () => {
    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        const instance = new rules[key as keyof typeof rules]({level: 'error', options: {allow: ''}});

        expect((instance as any).getName()).toBe(instance.constructor.name);
      }
    }
  });
});
