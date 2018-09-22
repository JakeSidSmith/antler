import { RegexRule } from '../../src/regex-rule';
import { Path } from '../../src/rules/path';
import { Node } from '../../src/types';

describe('Path', () => {
  const fileNode: Node = {
    fullPath: 'root/parent/child.json',
    path: 'parent/child.json',
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
    const instance = new Path({level: 'error', options: {allow: ''}});

    expect(instance instanceof RegexRule).toBe(true);
  });

  describe('shouldRun', () => {
    it('should run only for any type', () => {
      const instance = new Path({level: 'error', options: {allow: ''}});

      expect((instance as any).shouldRun(fileNode)).toBe(true);
      expect((instance as any).shouldRun(directoryNode)).toBe(true);
    });
  });

  describe('getPart', () => {
    it('should return the file path', () => {
      const instance = new Path({level: 'error', options: {allow: ''}});

      expect((instance as any).getPart(directoryNode)).toBe('parent/child.json');
    });
  });
});
