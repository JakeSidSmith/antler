import chalk from 'chalk';

export class AntlerWarning extends Error {
  public message: string;

  public constructor (message: string) {
    super(message);

    this.message = `${chalk.yellow('WARNING')} ${message}`;
  }
}
