import express from "express";
import * as controllerEntities from "v4/controllers/Entity";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/api/movies/:id", asyncHandler(controllerEntities.movieGet, "movieGet"));
router.use("/4.0/api/movies", asyncHandler(controllerEntities.moviesGet, "moviesGet"));

export default router;
