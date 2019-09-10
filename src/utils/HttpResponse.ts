import { inRange } from '@utils/helpers/inRange';

/**
 * Class-helper for work with fetch response
 */
export class HttpResponse<R = null> {
  constructor(private readonly response: Response) {}

  /**
   * Get status text
   *
   * @returns {string}
   */
  public getStatusText(): string {
    return this.response.statusText;
  }

  /**
   * Get response status
   *
   * @returns {number}
   */
  public getStatus(): number {
    return this.response.status;
  }

  /**
   * Return response body if exists
   *
   * @returns {*|null}
   */
  public async getBody(): Promise<R | null> {
    const contentType = this.response.headers.get('Content-Type');

    if (!contentType) {
      return null;
    }

    if (contentType.indexOf('application/json') !== -1) {
      return this.response.json();
    }

    return null;
  }

  /**
   * Validation is a information response
   *
   * @returns {boolean}
   */
  public isInfo(): boolean {
    return inRange(this.response.status, {
      from: 100,
      to: 200, toInclude: false
    });
  }

  /**
   * Validation is a successful response
   *
   * @returns {boolean}
   */
  public isSuccessful(): boolean {
    return this.response.ok;
  }

  /**
   * Validation is a redirection response
   *
   * @returns {boolean}
   */
  public isRedirection(): boolean {
    return inRange(this.response.status, {
      from: 300,
      to: 400, toInclude: false
    });
  }

  /**
   * Validation is a client error response
   *
   * @returns {boolean}
   */
  public isClientError(): boolean {
    return inRange(this.response.status, {
      from: 400,
      to: 500, toInclude: false
    });
  }

  /**
   * Validation is a server error response
   *
   * @returns {boolean}
   */
  public isServerError(): boolean {
    return inRange(this.response.status, {from: 500});
  }

  /**
   * Validation is a error response
   *
   * @returns {boolean}
   */
  public isError(): boolean {
    return this.isServerError() || this.isClientError();
  }
}
