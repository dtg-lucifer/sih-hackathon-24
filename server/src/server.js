import express from "express";
import cors from "cors";

import { envVars } from "../config/env.vars.js";
import { corsOptionsDelegate } from "./utils/cors.js";
import { logger, loggerMiddleware } from "./loggers/index.js";

import { errorHandler } from "./middlewares/errorHandler.middleware.js";

import { verificationRouter } from "./routes/verification.route.js";
import { grievanceRouter } from "./routes/grievance.route.js";
import { connectDB } from "./db/mongo.db.js";

//! CONSTANTS
const app = express();
const { conn: mongo__connection } = await connectDB();

app.use(errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);
app.use(cors(corsOptionsDelegate));

//! Routes
app.use("/api/v1/verify", verificationRouter);
app.use("/api/v1/grievance", grievanceRouter);

app.listen(envVars.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", err => {
  logger.error(`Error: ${err.message}`);
  mongo__connection.disconnect();
  logger.error("MongoDB connection closed");
});
