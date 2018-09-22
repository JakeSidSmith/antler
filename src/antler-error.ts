import chalk from 'chalk';

export class AntlerError extends Error {
  public message: string;

  public constructor (message: string) {
    super(message);

    this.message = `${chalk.red('ERROR')} ${message}`;
  }
}
