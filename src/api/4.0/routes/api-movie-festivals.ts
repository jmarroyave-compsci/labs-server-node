import express from "express";
import * as controller from "v4/controllers/MovieFestival";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/api/movie-festivals/:id", asyncHandler(controller.movieFestivalGet, "movieFestivalGet"));
router.use("/4.0/api/movie-festivals", asyncHandler(controller.movieFestivalsGet, "movieFestivalsGet"));

export default router;
