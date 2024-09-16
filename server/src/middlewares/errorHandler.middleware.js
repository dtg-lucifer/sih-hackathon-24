import log from "../loggers/config/winston.logger.js";

export const errorHandler = (err, req, res, next) => {
  log.error(err.stack);
  next({ message: err.message })
};