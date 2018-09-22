import { Rule } from '../../src/rule';
import { NoLonelyIndex } from '../../src/rules/no-lonely-index';
import { Node } from '../../src/types';

describe('NoLonelyIndex', () => {
  it('should extend Rule', () => {
    const instance = new NoLonelyIndex('error');

    expect(instance instanceof Rule).toBe(true);
  });

  describe('run', () => {
    const lonelyIndex: Node = {
      fullPath: 'root/parent/index.js',
      path: 'parent/index.js',
      name: 'index.js',
      parentName: 'parent',
      siblingNamesIncludingSelf: ['index.js'],
      childNames: [],
      isDirectory: false,
    };

    const okayIndex: Node = {
      ...lonelyIndex,
      siblingNamesIncludingSelf: ['index.js', 'types.js'],
    };

    const directoryNode = {
      fullPath: 'root/parent/child',
      path: 'parent/child',
      name: 'child',
      parentName: 'parent',
      siblingNamesIncludingSelf: ['child'],
      childNames: [],
      isDirectory: true,
    };

    it('should throw for lone index files', () => {
      const instance = new NoLonelyIndex('error');

      expect(() => instance.run(lonelyIndex)).toThrow('Lonely index file');
    });

    it('should ignore directories', () => {
      const instance = new NoLonelyIndex('error');

      expect(() => instance.run(directoryNode)).not.toThrow();
    });

    it('should not throw for index files with siblings', () => {
      const instance = new NoLonelyIndex('error');

      expect(() => instance.run(okayIndex)).not.toThrow();
    });
  });
});
