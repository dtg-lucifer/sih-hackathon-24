import mongoose from "mongoose";
import { envVars } from "../../config/env.vars.js";
import { logger } from "../loggers/index.js";

const connectDB = async () => {
  let conn;
  try {
    conn = await mongoose.connect(envVars.MONGO_URL, {
      dbName: "railmadad",
    });

    logger.info(
      `MongoDB Connected: ${JSON.stringify({ host: conn.connection.host })}`
    );
  } catch (error) {
    logger.error(`DB Connection Error: ${error.message}`);
    process.exit(1);
  }
  return { conn };
};

export { connectDB };
