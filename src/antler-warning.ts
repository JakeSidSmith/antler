import chalk from 'chalk';
import { Level } from './types';

export class AntlerWarning extends Error {
  public message: string;

  public constructor (message: string, level: Level) {
    super(message);

    this.message = `${chalk.yellow(level.toUpperCase())} ${message}`;
  }
}
