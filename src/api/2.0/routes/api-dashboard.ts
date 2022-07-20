import express from "express";
import * as controller from "v2/controllers/Dashboard";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/dashboard/home", asyncHandler(controller.dashboardHomeGet, "dashboardHomeGet"));
router.use("/2.0/api/dashboard/movies", asyncHandler(controller.dashboardMoviesGet, "dashboardMoviesGet"));
router.use("/2.0/api/dashboard/movies-festivals", asyncHandler(controller.dashboardMovieFestivals, "dashboardMovieFestivals"));
router.use("/2.0/api/dashboard/podcasts", asyncHandler(controller.dashboardPodcastsGet, "dashboardPodcastsGet"));
router.use("/2.0/api/dashboard/people", asyncHandler(controller.dashboardPeopleGet, "dashboardPeopleGet"));
router.use("/2.0/api/dashboard/video-games", asyncHandler(controller.dashboardGamesGet, "dashboardGamesGet"));
router.use("/2.0/api/dashboard/tv-shows", asyncHandler(controller.dashboardTVGet, "dashboardTVGet"));

export default router;