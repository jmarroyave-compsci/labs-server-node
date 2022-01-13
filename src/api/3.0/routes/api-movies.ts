import express from "express";
import * as controllerEntities from "v3/controllers/Entity";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/3.0/api/movies/:id", asyncHandler(controllerEntities.movieGet, "movieGet"));
router.use("/3.0/api/movies", asyncHandler(controllerEntities.moviesGet, "moviesGet"));

export default router;
