import { Level } from './types';

export class AntlerError extends Error {
  public message: string;
  public level: Level;

  public constructor (message: string, level: Level) {
    super(message);

    this.message = message;
    this.level = level;
  }
}
