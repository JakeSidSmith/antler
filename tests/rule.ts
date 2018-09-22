import { Rule } from '../src/rule';
import { Node } from '../src/types';

describe('Rule', () => {
  class NoDirectories extends Rule {
    public run (node: Node) {
      if (!node.isDirectory) {
        this.report(`File ${node.path} is not a directory`);
      }
    }

    protected getName () {
      return 'NoDirectories';
    }
  }

  describe('creation', () => {
    it('should create an instance', () => {
      const instance = new NoDirectories('error');

      expect(instance instanceof Rule).toBe(true);
    });

    it('should throw invalid config', () => {
      function createInstance() {
        return new NoDirectories(null as any);
      }

      expect(createInstance).toThrow('NoDirectories: Invalid config - must be a string or object');
    });
  });
});
