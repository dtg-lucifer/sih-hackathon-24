import { model, Schema } from "mongoose";
import Joi from "joi";

export const GrievanceSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    journeyType: {
      type: String,
      required: true,
    },
    journeyNumber: {
      type: String,
      required: true,
    },
    problemType: {
      type: String,
      required: true,
    },
    problemSubType: {
      type: String,
      required: true,
    },
    doi: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const GrievanceJoiParser = Joi.object({
  phoneNumber: Joi.string().required(),
  journeyType: Joi.string().required(),
  journeyNumber: Joi.string().required(),
  problemType: Joi.string().required(),
  problemSubType: Joi.string().required(),
  doi: Joi.date().required(),
  description: Joi.string().required(),
});

export const Grievance = model("Grievance", GrievanceSchema, "grievances");
