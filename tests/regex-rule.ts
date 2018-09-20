import RegexRule from '../src/regex-rule';

describe('RegexRule', () => {
  class CustomRule extends RegexRule {
    protected getName () {
      return 'custom-rule';
    }

    protected run (resolvedPath: string) {
      if (resolvedPath.indexOf('error') >= 0) {
        this.report(resolvedPath);
      }
    }
  }

  it('should create an instance', () => {
    const instance = new CustomRule([2, {allow: ''}]);

    expect(instance instanceof RegexRule).toBe(true);
  });

  it('should throw invalid config', () => {
    function createInstance() {
      return new CustomRule(null as any);
    }

    expect(createInstance).toThrow('ERROR custom-rule: Invalid config, must be a string, number, or array');
  });

  it('should throw invalid options', () => {
    function createInstance() {
      return new CustomRule(2);
    }

    expect(createInstance).toThrow('ERROR custom-rule: Invalid options, must be an object');
  });

  it('should throw no keys', () => {
    function createInstance() {
      return new CustomRule([2, {}]);
    }

    expect(createInstance).toThrow('ERROR custom-rule: No keys in options');
  });

  it('should throw invalid keys', () => {
    function createInstance() {
      return new CustomRule([2, {nope: ''}]);
    }

    expect(createInstance).toThrow('ERROR custom-rule: Invalid key in options - nope');
  });

  it('should throw invalid key types', () => {
    function createInstance() {
      return new CustomRule([2, {allow: 1 as any}]);
    }

    expect(createInstance).toThrow('ERROR custom-rule: Type of key allow must be a string or array of strings');
  });
});
