import { AntlerWarning } from '../src/antler-warning';

describe('AntlerWarning', () => {
  it('should construct a warning with level prefix', () => {
    const instance = new AntlerWarning('Something went kind of wrong!');

    expect(instance.message).toBe('WARNING Something went kind of wrong!');
  });
});
