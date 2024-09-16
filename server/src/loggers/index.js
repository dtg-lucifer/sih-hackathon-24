import log from "./config/winston.logger.js";
import { loggerMiddleware } from "./config/morgan.logger.js";

export { log as logger, loggerMiddleware };