import express from "express";
import * as controller from "v2/controllers/Stories";
import * as topicsController from "v2/controllers/Topic";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/stories/movies/topics/:topic", asyncHandler(topicsController.getTopic, "topic-get"));
router.use("/2.0/api/stories/movies/topics", asyncHandler(topicsController.get, "topics-get"));
router.use("/2.0/api/stories/movies/awards", asyncHandler(controller.awards, "awards"));
router.use("/2.0/api/stories/movies/remakes", asyncHandler(controller.remakes, "remakes"));
//router.use("/2.0/api/stories/movies/history", asyncHandler(controller.history, "history"));
router.use("/2.0/api/stories/people/directors", asyncHandler(controller.peopleDirectors, "peopleDirectors"));
router.use("/2.0/api/stories/people/producers", asyncHandler(controller.peopleProducers, "peopleProducers"));
router.use("/2.0/api/stories/people/writers", asyncHandler(controller.peopleWriters, "peopleWriters"));
router.use("/2.0/api/stories/people/actors", asyncHandler(controller.peopleActors, "peopleActors"));

export default router;
