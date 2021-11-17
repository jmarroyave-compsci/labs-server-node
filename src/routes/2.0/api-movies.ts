import express from "express";
import * as controllerEntities from "../../controllers/2.0/Entity";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/movies/:id", asyncHandler(controllerEntities.movieGet, "movieGet"));
router.use("/2.0/api/movies", asyncHandler(controllerEntities.moviesGet, "moviesGet"));

export default router;
