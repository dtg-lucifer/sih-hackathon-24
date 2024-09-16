import morgan from "morgan";
import winstonLoggerHelper from "./winston.logger.js";

const stream = {
  write: message => winstonLoggerHelper.http(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const loggerMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream, skip }
);

export { loggerMiddleware };
