import express from "express";
import * as controller from "../../controllers/Dashboard";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/dashboard", asyncHandler(controller.dashboardGet, "dashboardGet"));

export default router;
