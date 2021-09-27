import express from "express";
import * as controller from "../../controllers/2.0/Person";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/person/:id", asyncHandler(controller.personGet, "personGet"));

export default router;
