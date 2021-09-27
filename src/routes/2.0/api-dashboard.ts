import express from "express";
import * as controller from "../../controllers/2.0/Dashboard";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/dashboard/home", asyncHandler(controller.dashboardHomeGet, "dashboardGet"));
router.use("/2.0/api/dashboard/movies", asyncHandler(controller.dashboardMoviesGet, "dashboardGet"));
router.use("/2.0/api/dashboard/podcasts", asyncHandler(controller.dashboardPodcastsGet, "dashboardGet"));
router.use("/2.0/api/dashboard/people", asyncHandler(controller.dashboardPeopleGet, "dashboardGet"));

export default router;
