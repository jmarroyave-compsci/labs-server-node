import express from "express";
import * as controller from "../../controllers/2.0/TV";
import * as controllerEntities from "../../controllers/2.0/Entity";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/tv-shows/:id", asyncHandler(controller.tvGet, "tvGet"));
router.use("/2.0/api/tv-shows", asyncHandler(controllerEntities.tvShowsGet, "tvGet"));

export default router;