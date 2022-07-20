import express from "express";
import * as controllerEntities from "v3/controllers/Entity";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/3.0/api/tv-shows/:id", asyncHandler(controllerEntities.tvShowGet, "tvShowGet"));
router.use("/3.0/api/tv-shows", asyncHandler(controllerEntities.tvShowsGet, "tvShowGet"));

export default router;