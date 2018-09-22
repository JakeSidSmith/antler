import { Rule } from '../../src/rule';
import { NoJuniors } from '../../src/rules/no-juniors';
import { Node } from '../../src/types';

describe('NoJuniors', () => {
  it('should extend Rule', () => {
    const instance = new NoJuniors('error');

    expect(instance instanceof Rule).toBe(true);
  });

  describe('run', () => {
    const juniorFile: Node = {
      fullPath: 'root/parent/parent.json',
      path: 'parent/parent.json',
      name: 'parent.json',
      parentName: 'parent',
      siblingNamesIncludingSelf: ['parent.json'],
      childNames: [],
      isDirectory: false,
    };

    const juniorDirectory: Node = {
      fullPath: 'root/parent/parent',
      path: 'parent/parent',
      name: 'parent',
      parentName: 'parent',
      siblingNamesIncludingSelf: ['parent'],
      childNames: [],
      isDirectory: true,
    };

    const okayNode = {
      fullPath: 'root/parent/child.json',
      path: 'parent/child.json',
      name: 'child.json',
      parentName: 'parent',
      siblingNamesIncludingSelf: ['child.json'],
      childNames: [],
      isDirectory: false,
    };

    it('should throw for junior files', () => {
      const instance = new NoJuniors('error');

      expect(() => instance.run(juniorFile)).toThrow('matches its parent');
    });

    it('should throw for junior directories', () => {
      const instance = new NoJuniors('error');

      expect(() => instance.run(juniorDirectory)).toThrow('matches its parent');
    });

    it('should not throw for children that do not share a name with their parent', () => {
      const instance = new NoJuniors('error');

      expect(() => instance.run(okayNode)).not.toThrow('not have any contents');
    });
  });
});
