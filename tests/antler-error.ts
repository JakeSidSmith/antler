import { AntlerError } from '../src/antler-error';

describe('AntlerError', () => {
  it('should construct an error with level prefix', () => {
    const instance = new AntlerError('Something went wrong!');

    expect(instance.message).toBe('ERROR Something went wrong!');
  });
});
