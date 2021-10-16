import express from "express";
import * as controller from "../../controllers/2.0/Movie";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/movie-festivals/:id", asyncHandler(controller.movieFestivalGet, "movieFestivalGet"));
router.use("/2.0/api/movie-festivals", asyncHandler(controller.movieFestivalsGet, "movieFestivalsGet"));

export default router;
