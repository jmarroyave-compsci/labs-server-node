import express from "express";
import * as controller from "../controllers/Dashboard";
import { asyncHandler } from "../lib/asyncHandler";

const router = express.Router();
router.use("/api/dashboard", asyncHandler(controller.dashboardGet, "dashboardGet"));

export default router;
