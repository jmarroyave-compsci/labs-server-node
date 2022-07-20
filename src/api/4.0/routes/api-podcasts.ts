import express from "express";
import * as controller from "v4/controllers/Podcast";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/api/podcasts/category/music", asyncHandler(controller.podcastMusicGet, "podcastsMusic"));
router.use("/4.0/api/podcasts/:id", asyncHandler(controller.podcastGet, "podcastGet"));
router.use("/4.0/api/podcasts", asyncHandler(controller.podcastsGet, "podcastsGet"));

export default router;
