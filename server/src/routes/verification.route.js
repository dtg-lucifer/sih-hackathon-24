import { Router } from "express";
import { logger } from "../loggers/index.js";
import { generateOtp, verifyOtp } from "../services/generateOtp.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../utils/responseObjects.js";

const verificationRouter = Router();

verificationRouter
  .post(
    "/generate-otp",
    asyncHandler(async (req, res) => {
      const { phoneNumber } = req.body;

      logger.info(`Generating OTP for ${phoneNumber}`);

      try {
        const payload = await generateOtp(phoneNumber);
        return res
          .status(200)
          .json({
            payload,
            info: new ApiResponse(200, payload, "OTP sent successfully"),
          });
      } catch (error) {
        logger.error(`Error while generating OTP for ${phoneNumber}`);
        logger.error(error);

        if (error.statusCode === 500)
          return res
            .status(500)
            .json(
              new ApiError(
                500,
                `Error while generating OTP, cause: ${error.cause}`,
                [error],
                error.stack
              )
            );

        return res
          .status(400)
          .json(
            new ApiError(
              400,
              "Something wrong with the data, please try again",
              error.stack
            )
          );
      }
    })
  )
  .post(
    "/verify-otp",
    asyncHandler(async (req, res) => {
      const { phoneNumber, code } = req.body;

      logger.info(`Verifying OTP for ${phoneNumber}`);

      try {
        const payload = await generateOtp(phoneNumber);
        return res
          .status(200)
          .json({
            payload,
            info: new ApiResponse(200, payload, "OTP verified successfully"),
          });
      } catch (error) {
        logger.error(`Error while verifying OTP for ${phoneNumber}`);
        logger.error(error.message);

        if (error.statusCode === 500)
          return res
            .status(500)
            .json(
              new ApiError(
                500,
                `Error while verifying OTP, cause: ${error.cause}`,
                [error],
                error.stack
              )
            );

        return res
          .status(400)
          .json(
            new ApiError(
              400,
              "Something wrong with the data, please try again",
              error.stack
            )
          );
      }
    })
  );

export { verificationRouter };
