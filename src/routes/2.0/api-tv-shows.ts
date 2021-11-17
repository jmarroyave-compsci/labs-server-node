import express from "express";
import * as controllerEntities from "../../controllers/2.0/Entity";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/tv-shows/:id", asyncHandler(controllerEntities.tvShowGet, "tvShowGet"));
router.use("/2.0/api/tv-shows", asyncHandler(controllerEntities.tvShowsGet, "tvShowGet"));

export default router;