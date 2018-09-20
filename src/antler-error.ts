class AntlerError extends Error {
  public message: string;
  public level: number;

  public constructor (message: string, level: number) {
    super(message);

    this.message = message;
    this.level = level;
  }
}

export default AntlerError;
