import { RegexRule } from '../../src/regex-rule';
import { DirectoryName } from '../../src/rules/directory-name';
import { Node } from '../../src/types';

describe('DirectoryName', () => {
  const directoryNode: Node = {
    fullPath: 'parent/child',
    path: 'child',
    name: 'child',
    parentName: 'parent',
    siblingNamesIncludingSelf: ['child'],
    childNames: [],
    isDirectory: true,
  };

  const fileNode = {
    ...directoryNode,
    isDirectory: false,
  };

  it('should extend RegexRule', () => {
    const instance = new DirectoryName({level: 'error', options: {allow: ''}});

    expect(instance instanceof RegexRule).toBe(true);
  });

  describe('shouldRun', () => {
    it('should run only for directories', () => {
      const instance = new DirectoryName({level: 'error', options: {allow: ''}});

      expect((instance as any).shouldRun(directoryNode)).toBe(true);
      expect((instance as any).shouldRun(fileNode)).toBe(false);
    });
  });

  describe('getPart', () => {
    it('should return the file / directory name', () => {
      const instance = new DirectoryName({level: 'error', options: {allow: ''}});

      expect((instance as any).getPart(directoryNode)).toBe('child');
    });
  });
});
