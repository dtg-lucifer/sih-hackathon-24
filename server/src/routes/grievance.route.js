import { Router } from "express";
import { Grievance, GrievanceJoiParser } from "../db/models/grievance.model.js";

const grievanceRouter = Router();

grievanceRouter
  .get("/", async (req, res) => {
    const grievances = await Grievance.find();

    if (grievances.length === 0) {
      return res.status(404).send("No grievances found");
    }

    return res.status(200).json(grievances);
  })
  .post("/", (req, res) => {
    const { error } = GrievanceJoiParser.validate(req.body);

    if (error) {
      const cause = error.details.map(detail => detail.message).join(", ");
      return res.status(400).json({
        message:
          "Some fields might be missing or invalid, please check and re-submit the form !",
        cause,
      });
    }

    const grievance = new Grievance(req.body);

    grievance
      .save()
      .then(() => {
        res
          .status(201)
          .json({
            msg: "Successfully created a grievance with these details",
            grievance,
          });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

export { grievanceRouter };
