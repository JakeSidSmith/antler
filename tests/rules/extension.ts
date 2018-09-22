import { RegexRule } from '../../src/regex-rule';
import { Extension } from '../../src/rules/extension';
import { Node } from '../../src/types';

describe('Extension', () => {
  const fileNode: Node = {
    fullPath: 'parent/child.json',
    path: 'child.json',
    name: 'child.json',
    parentName: 'parent',
    siblingNamesIncludingSelf: ['child.json'],
    childNames: [],
    isDirectory: false,
  };

  const directoryNode = {
    ...fileNode,
    isDirectory: true,
  };

  it('should extend RegexRule', () => {
    const instance = new Extension({level: 'error', options: {allow: ''}});

    expect(instance instanceof RegexRule).toBe(true);
  });

  describe('shouldRun', () => {
    it('should run only for files', () => {
      const instance = new Extension({level: 'error', options: {allow: ''}});

      expect((instance as any).shouldRun(fileNode)).toBe(true);
      expect((instance as any).shouldRun(directoryNode)).toBe(false);
    });
  });

  describe('getPart', () => {
    it('should return the file extension', () => {
      const instance = new Extension({level: 'error', options: {allow: ''}});

      expect((instance as any).getPart(directoryNode)).toBe('.json');
    });
  });
});
