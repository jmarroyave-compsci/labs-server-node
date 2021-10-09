import express from "express";
import * as controller from "../../controllers/2.0/Stories";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/stories/podcast/music", asyncHandler(controller.podcastMusic, "podcastsMusic"));
router.use("/2.0/api/stories/awards", asyncHandler(controller.awards, "awards"));
router.use("/2.0/api/stories/remakes", asyncHandler(controller.remakes, "remakes"));

export default router;
