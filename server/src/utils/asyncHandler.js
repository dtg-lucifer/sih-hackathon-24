/**
 * @description This is async handler function which will wrap any async code block to leak out the errors from inside and stopping the whole server and it will simply pass on the error to the next middleware
 * @param {() => any} handler
 * @returns {Promise<any>}
 */
export const asyncHandler = handler => {
  return (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next);
};
