import { Rule } from '../src/rule';
import { Node } from '../src/types';

describe('Rule', () => {
  class NoDirectories extends Rule {
    public run (node: Node) {
      if (!node.isDirectory) {
        this.report(`File ${node.path} is not a directory`);
      }
    }

    public report (error: Error | string) {
      super.report(error);
    }

    public error (error: Error | string) {
      super.error(error);
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

      expect(() => instance.report('error')).toThrow('ERROR NoDirectories: error');
      expect(() => instance.report(new Error('error'))).toThrow('ERROR NoDirectories: error');
    });

    it('should create warnings from error or string', () => {
      const instance = new NoDirectories('warning');

      expect(() => instance.report('warning')).toThrow('WARNING NoDirectories: warning');
      expect(() => instance.report(new Error('warning'))).toThrow('WARNING NoDirectories: warning');
    });

    it('should not report if rule is disabled', () => {
      const instance = new NoDirectories('off');

      expect(() => instance.report('error')).not.toThrow('ERROR NoDirectories: error');
    });
  });

  describe('error', () => {
    it('should create errors from error or string', () => {
      const instance = new NoDirectories('error');

      expect(() => instance.error('error')).toThrow('NoDirectories: error');
      expect(() => instance.error(new Error('error'))).toThrow('NoDirectories: error');

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
});
