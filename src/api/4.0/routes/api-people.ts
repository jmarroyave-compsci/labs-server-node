import express from "express";
import * as controller from "v4/controllers/Person";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/api/people/:id", asyncHandler(controller.personGet, "personGet"));
router.use("/4.0/api/people", asyncHandler(controller.peopleGet, "peopleGet"));

export default router;
