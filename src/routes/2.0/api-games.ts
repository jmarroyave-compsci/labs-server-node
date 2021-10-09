import express from "express";
import * as controller from "../../controllers/2.0/Game";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/game/:id", asyncHandler(controller.gameGet, "gameGet"));

export default router;
