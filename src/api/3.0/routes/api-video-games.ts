import express from "express";
import * as controllerEntities from "v3/controllers/Entity";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/3.0/api/video-games/:id", asyncHandler(controllerEntities.videoGameGet, "gameGet"));
router.use("/3.0/api/video-games", asyncHandler(controllerEntities.videoGamesGet, "gamesGet"));

export default router;
