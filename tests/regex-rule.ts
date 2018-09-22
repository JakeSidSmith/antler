import { RegexRule } from '../src/regex-rule';
import { Node } from '../src/types';

describe('RegexRule', () => {
  class DirectoryPath extends RegexRule {
    protected getName () {
      return 'DirectoryPath';
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
      const instance = new DirectoryPath({level: 'error', options: {allow: ''}});

      expect(instance instanceof RegexRule).toBe(true);
    });

    it('should throw invalid config', () => {
      function createInstance() {
        return new DirectoryPath(null as any);
      }

      expect(createInstance).toThrow('DirectoryPath: Invalid config - must be a string or object');
    });

    it('should throw invalid options', () => {
      function createInstance() {
        return new DirectoryPath('error');
      }

      expect(createInstance).toThrow('DirectoryPath: Invalid options - must be an object');
    });

    it('should throw invalid keys (no allow / disallow)', () => {
      function createInstance() {
        return new DirectoryPath({level: 'error', options: {}});
      }

      expect(createInstance).toThrow('DirectoryPath: Invalid option keys - must include one of allow, disallow');
    });

    it('should throw invalid keys', () => {
      function createInstance() {
        return new DirectoryPath({level: 'error', options: {nope: '', allow: ''}});
      }

      expect(createInstance).toThrow('DirectoryPath: Invalid key in options - nope');
    });

    it('should throw invalid key types', () => {
      function createInstance() {
        return new DirectoryPath({level: 'error', options: {allow: 5}} as any);
      }

      expect(createInstance).toThrow('DirectoryPath: Type of key allow must be a string or array of strings');
    });
  });

  describe('reporting', () => {
    const invalidDirectoryNode: Node = {
      path: 'src/invalid',
      fullPath: '~/src/invalid',
      parentName: 'src',
      name: 'invalid',
      isDirectory: true,
      siblingNamesIncludingSelf: ['invalid'],
      childNames: [],
    };

    const validDirectoryNode: Node = {
      ...invalidDirectoryNode,
      path: 'src/valid',
    };

    it('should report if paths do not match allowed paths string', () => {
      const instance = new DirectoryPath({level: 'error', options: {allow: '^src/valid$'}});

      expect(() => instance.run(invalidDirectoryNode)).toThrow('does not match allowed');
      expect(() => instance.run(validDirectoryNode)).not.toThrow();
    });

    it('should report if paths do not match allowed paths array', () => {
      const instance = new DirectoryPath({level: 'error', options: {allow: ['^src/valid$']}});

      expect(() => instance.run(invalidDirectoryNode)).toThrow('does not match allowed');
      expect(() => instance.run(validDirectoryNode)).not.toThrow();
    });

    it('should report if paths match disallowed paths string', () => {
      const instance = new DirectoryPath({level: 'error', options: {disallow: 'invalid'}});

      expect(() => instance.run(invalidDirectoryNode)).toThrow('matches disallowed');
      expect(() => instance.run(validDirectoryNode)).not.toThrow();
    });

    it('should report if paths match disallowed paths array', () => {
      const instance = new DirectoryPath({level: 'error', options: {disallow: ['invalid']}});

      expect(() => instance.run(invalidDirectoryNode)).toThrow('matches disallowed');
      expect(() => instance.run(validDirectoryNode)).not.toThrow();
    });

    it('should not run if shouldRun returns false', () => {
      const instance = new DirectoryPath({level: 'error', options: {allow: '^src/valid$'}});
      const invalidFileNode = {
        ...invalidDirectoryNode,
        isDirectory: false,
      };

      expect(() => instance.run(invalidFileNode)).not.toThrow('does not match allowed');
    });

    it('should use case sensitive regexes', () => {
      const instance1 = new DirectoryPath({level: 'error', options: {allow: '^[a-z-/]+$'}});
      const instance2 = new DirectoryPath({level: 'error', options: {allow: '^[A-Z-/]+$'}});

      expect(() => instance1.run(invalidDirectoryNode)).not.toThrow('does not match allowed');
      expect(() => instance2.run(invalidDirectoryNode)).toThrow('does not match allowed');
    });
  });
});
