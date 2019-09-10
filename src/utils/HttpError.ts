import { HttpResponse } from './HttpResponse';

export type ErrorBody <P> = P | null;

/**
 * Http exception for throwing
 */
export class HttpError<R> extends Error {
  private status: number;

  /**
   * @param {HttpResponse}  response  Http response helper
   */
  constructor(protected readonly response: HttpResponse<R>) {
    super(`Http error - "${response.getStatusText()}"`);

    this.name = this.constructor.name;
    this.status = this.response.getStatus();
  }

  /**
   * Return response body if exists
   *
   * @see HttpResponse.prototype.getBody
   */
  public async getBody() {
    return this.response.getBody();
  }

  /**
   * Return string representation of the exception
   *
   * @returns {string}
   */
  public toString(): string {
    const stack = typeof this.stack === 'string'
      ? this.stack.substr(this.stack.indexOf('\n'))
      : '';

    return `${super.toString()} (${this.status}): ${stack}`;
  }

  /**
   * Validation is a type of *Bad Request* error
   *
   * @returns {boolean}
   */
  public isBadRequest(): boolean {
    return this.status === 400;
  }

  /**
   * Validation is a type of *Unauthorized* error
   *
   * @returns {boolean}
   */
  public isUnauthorized(): boolean {
    return this.status === 401;
  }

  /**
   * Validation is a type of *Forbidden* error
   *
   * @returns {boolean}
   */
  public isForbidden(): boolean {
    return this.status === 403;
  }

  /**
   * Validation is a type of *Not Found* error
   *
   * @returns {boolean}
   */
  public isNotFound(): boolean {
    return this.status === 404;
  }
}
