import dotenv from "dotenv";

dotenv.config({ path: "./config/.env.local" });

export const envVars = {
  PORT: process.env.PORT,
  TWILLIO_ACCOUNT_SID: process.env.TWILLIO_ACCOUNT_SID,
  TWILLIO_AUTH_TOKEN: process.env.TWILLIO_AUTH_TOKEN,
  TWILLIO_SERVICE_SID: process.env.TWILLIO_SERVICE_SID,
  MONGO_URL: process.env.MONGO_URL,
};
