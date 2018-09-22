import fs from 'fs';
import path from 'path';
import * as rules from '../../src/rules';

const MATCHES_WORD_START = /\b\w/g;
const MATCHES_HYPHEN = /-/g;
const MATCHES_INDEX_FILE = /^index\./;
const MATCHES_EXTENSION = /\..+/;

const toClassName = (value: string) => {
  return value
    .replace(MATCHES_EXTENSION, '')
    .replace(MATCHES_WORD_START, (match) => {
      return match.toUpperCase();
    })
    .replace(MATCHES_HYPHEN, '');
};

describe('rules', () => {
  it('should export an object containing all rules', () => {
    const rulesFiles = fs.readdirSync(path.resolve(__dirname, '../../src/rules')).filter((name) => {
      return !MATCHES_INDEX_FILE.test(name);
    });
    const rulesClassNames = rulesFiles.map(toClassName);

    const exportedClassNames = Object.keys(rules);

    exportedClassNames.forEach((className) => {
      expect(rulesClassNames).toContain(className);
    });
  });
});
