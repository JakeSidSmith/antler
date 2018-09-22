import { RegexRule } from '../src/regex-rule';
import { Node } from '../src/types';

describe('RegexRule', () => {
  class CustomRule extends RegexRule {
    protected getName () {
      return 'CustomRule';
    }

    protected shouldRun (node: Node) {
      return node.isDirectory;
    }

    protected getPart (node: Node) {
      return node.path;
    }
  }

  describe('creation', () => {
    it('should create an instance', () => {
      const instance = new CustomRule({level: 'error', options: {allow: ''}});

      expect(instance instanceof RegexRule).toBe(true);
    });

    it('should throw invalid config', () => {
      function createInstance() {
        return new CustomRule(null as any);
      }

      expect(createInstance).toThrow('CustomRule: Invalid config - must be a string or object');
    });

    it('should throw invalid options', () => {
      function createInstance() {
        return new CustomRule('error');
      }

      expect(createInstance).toThrow('CustomRule: Invalid options - must be an object');
    });

    it('should throw invalid keys (no allow / disallow)', () => {
      function createInstance() {
        return new CustomRule({level: 'error', options: {}});
      }

      expect(createInstance).toThrow('CustomRule: Invalid option keys - must include one of allow, disallow');
    });

    it('should throw invalid keys', () => {
      function createInstance() {
        return new CustomRule({level: 'error', options: {nope: '', allow: ''}});
      }

      expect(createInstance).toThrow('CustomRule: Invalid key in options - nope');
    });

    it('should throw invalid key types', () => {
      function createInstance() {
        return new CustomRule({level: 'error', options: {allow: 5}} as any);
      }

      expect(createInstance).toThrow('CustomRule: Type of key allow must be a string or array of strings');
    });
  });

  describe('reporting', () => {
    const directoryNode: Node = {
      path: 'src/invalid',
      fullPath: '~/src/invalid',
      parentName: 'src',
      name: 'invalid',
      isDirectory: true,
      siblingNamesIncludingSelf: ['invalid'],
      childNames: [],
    };

    it('should report if paths do not match allowed paths string', () => {
      const instance = new CustomRule({level: 'error', options: {allow: '^src/valid$'}});

      expect(() => instance.run(directoryNode)).toThrow('does not match allowed');
    });

    it('should report if paths do not match allowed paths array', () => {
      const instance = new CustomRule({level: 'error', options: {allow: ['^src/valid$']}});

      expect(() => instance.run(directoryNode)).toThrow('does not match allowed');
    });

    it('should report if paths match disallowed paths string', () => {
      const instance = new CustomRule({level: 'error', options: {disallow: 'invalid'}});

      expect(() => instance.run(directoryNode)).toThrow('matches disallowed');
    });

    it('should report if paths match disallowed paths array', () => {
      const instance = new CustomRule({level: 'error', options: {disallow: ['invalid']}});

      expect(() => instance.run(directoryNode)).toThrow('matches disallowed');
    });

    it('should not run if shouldRun returns false', () => {
      const instance = new CustomRule({level: 'error', options: {allow: '^src/valid$'}});
      const fileNode = {
        ...directoryNode,
        isDirectory: false,
      };

      expect(() => instance.run(fileNode)).not.toThrow('does not match allowed');
    });
  });
});
