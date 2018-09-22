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

  describe('report', () => {
    it('should create errors from error or string', () => {
      const instance = new NoDirectories('error');

      expect(() => (instance as any).report('error')).toThrow('ERROR NoDirectories: error');
      expect(() => (instance as any).report(new Error('error'))).toThrow('ERROR NoDirectories: error');
    });

    it('should create warnings from error or string', () => {
      const instance = new NoDirectories('warning');

      expect(() => (instance as any).report('warning')).toThrow('WARNING NoDirectories: warning');
      expect(() => (instance as any).report(new Error('warning'))).toThrow('WARNING NoDirectories: warning');
    });

    it('should not report if rule is disabled', () => {
      const instance = new NoDirectories('off');

      expect(() => (instance as any).report('error')).not.toThrow('ERROR NoDirectories: error');
    });
  });

  describe('error', () => {
    it('should create errors from error or string', () => {
      const instance = new NoDirectories('error');

      expect(() => (instance as any).error('error')).toThrow('NoDirectories: error');
      expect(() => (instance as any).error(new Error('error'))).toThrow('NoDirectories: error');
    });
  });

  describe('setLevel', () => {
    it('should error if level is not a string', () => {
      expect(() => new NoDirectories({level: 5} as any)).toThrow('Error level must be');
    });

    it('should error if level is not a know level', () => {
      expect(() => new NoDirectories({level: 'wat'} as any)).toThrow('Error level must be');
    });

    it('should set the error level from a string', () => {
      const instance = new NoDirectories('warning');

      expect((instance as any).level).toBe('warning');
    });

    it('should set the error level from a config object', () => {
      const instance = new NoDirectories({level: 'error'});

      expect((instance as any).level).toBe('error');
    });
  });

  describe('setOptions', () => {
    it('should error if options are not an object', () => {
      expect(() => new NoDirectories({level: 'error', options: null} as any))
        .toThrow('Invalid options - must be an object');

      expect(() => new NoDirectories({level: 'error', options: []} as any))
        .toThrow('Invalid options - must be an object');

      expect(() => new NoDirectories({level: 'error', options: 1} as any))
        .toThrow('Invalid options - must be an object');
    });
  });
});
