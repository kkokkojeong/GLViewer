class CustomError {
  protected name: string;
  protected message: string;
  protected stack: string;

  constructor(message: string) {
    this.message = message;

    try {
      throw new Error();
    } catch (e) {
      this.stack = e.stack;
    }
  }

  protected toString(): string {
    let str = `${this.name} : ${this.message}`

    if (str) {
      str += `\n ${this.stack.toString()}`;
    }
    return str;
  }
}

export class DeveloperError extends CustomError {
  constructor(message: string) {
    super(message);

    this.name = 'DeveloperError';
  }

  public toString(): string {
    return this.toString();
  }
}

export class RuntimeError extends CustomError {
  constructor(message: string) {
    super(message);

    this.name = 'RuntimeError';
  }

  public toString(): string {
    return this.toString();
  }
}
