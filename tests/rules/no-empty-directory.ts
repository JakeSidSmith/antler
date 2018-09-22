import { Rule } from '../../src/rule';
import { NoEmptyDirectory } from '../../src/rules/no-empty-directory';
import { Node } from '../../src/types';

describe('NoEmptyDirectory', () => {
  it('should extend Rule', () => {
    const instance = new NoEmptyDirectory('error');

    expect(instance instanceof Rule).toBe(true);
  });

  describe('run', () => {
    const emptyDirectory: Node = {
      fullPath: 'root/parent/child.json',
      path: 'parent/child.json',
      name: 'child.json',
      parentName: 'parent',
      siblingNamesIncludingSelf: ['child.json'],
      childNames: [],
      isDirectory: true,
    };

    const fullDirectory = {
      ...emptyDirectory,
      childNames: ['child'],
    };

    const fileNode = {
      ...emptyDirectory,
      isDirectory: false,
    };

    it('should throw for empty directories', () => {
      const instance = new NoEmptyDirectory('error');

      expect(() => instance.run(emptyDirectory)).toThrow('not have any contents');
    });

    it('should not throw for directories with children', () => {
      const instance = new NoEmptyDirectory('error');

      expect(() => instance.run(fullDirectory)).not.toThrow();
    });

    it('should ignore files', () => {
      const instance = new NoEmptyDirectory('error');

      expect(() => instance.run(fileNode)).not.toThrow();
    });
  });
});
