export class ApiResponse {
  /**
   * @param {Number} statusCode
   * @param {Record<any, any>} data
   * @param {String} message
   */
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 400;
  }
}

export class ApiError extends Error {
  /**
   * @param {Number} statusCode
   * @param {String} message
   * @param {Array} errors
   * @param {String} stack
   */
  constructor(statusCode, message, errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.stack = !!super.stack ? super.stack?.toString() : stack;

    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
