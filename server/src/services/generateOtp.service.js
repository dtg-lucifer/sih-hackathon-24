import twilio from "twilio";
import { envVars } from "../../config/env.vars.js";

const client = twilio(envVars.TWILLIO_ACCOUNT_SID, envVars.TWILLIO_AUTH_TOKEN);

/**
 * @param {String} phoneNumber
 * @returns {Promise}
 * @description This function is only for generating the OTP and sending it to the user
 * via SMS to their phone number
 */
export const generateOtp = async phoneNumber => {
  if (!phoneNumber) {
    throw new Error("Phone number is required");
  }

  if (typeof phoneNumber !== "string") {
    throw new Error("Phone number must be a string");
  }

  if (phoneNumber.length < 13) {
    throw new Error("Phone number is invalid, please put the country code");
  }

  client.verify.v2
    .services(envVars.TWILLIO_SERVICE_SID)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then(v => {
      return { statusCode: 200, verification: v };
    })
    .catch(() => {
      throw new Error("Something went wrong");
    });
};

/**
 * @param {String} phoneNumber
 * @param {String} code
 * @returns {Promise}
 * @description This function is only for verifying the OTP
 */
export const verifyOtp = async (phoneNumber, code) => {
  if (!phoneNumber) {
    throw new Error("Phone number is required");
  }

  if (typeof phoneNumber !== "string") {
    throw new Error("Phone number must be a string");
  }

  if (phoneNumber.length < 13) {
    throw new Error("Phone number is invalid, please put the conutry code");
  }

  if (!code) {
    throw new Error("OTP is required");
  }

  if (typeof code !== "string") {
    throw new Error("OTP must be a string");
  }

  if (code.length < 6) {
    throw new Error("OTP is invalid");
  }

  client.verify.v2
    .services(envVars.TWILLIO_SERVICE_SID)
    .verificationChecks.create({ to: phoneNumber, code })
    .then(v => {
      console.log("Verification Check:", v);
      return { status: "OK", verification: v };
    })
    .catch(err => {
      return { status: "ERROR", err };
    });
};
