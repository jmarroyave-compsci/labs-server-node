import express from "express";
import * as controller from "v2/controllers/Podcast";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/podcasts/category/music", asyncHandler(controller.podcastMusicGet, "podcastsMusic"));
router.use("/2.0/api/podcasts/:id", asyncHandler(controller.podcastGet, "podcastGet"));
router.use("/2.0/api/podcasts", asyncHandler(controller.podcastsGet, "podcastsGet"));

export default router;
