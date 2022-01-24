import express from "express";
import * as controllerEntities from "v4/controllers/Entity";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/api/tv-shows/:id", asyncHandler(controllerEntities.tvShowGet, "tvShowGet"));
router.use("/4.0/api/tv-shows", asyncHandler(controllerEntities.tvShowsGet, "tvShowGet"));

export default router;