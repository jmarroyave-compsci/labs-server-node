import express from "express";
import * as controller from "../../controllers/2.0/Podcast";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/podcasts/category/music", asyncHandler(controller.podcastMusicGet, "podcastsMusic"));
router.use("/2.0/api/podcasts/:id", asyncHandler(controller.podcastGet, "podcastGet"));

export default router;
