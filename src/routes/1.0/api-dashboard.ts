import express from "express";
import * as controller from "../../controllers/1.0/Dashboard";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/1.0/api/dashboard", asyncHandler(controller.dashboardGet, "dashboardGet"));

export default router;
