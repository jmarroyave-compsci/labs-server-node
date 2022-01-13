import express from "express";
import * as controller from "v3/controllers/Topic";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/3.0/api/topics/:topic", asyncHandler(controller.getTopic, "topicGet"));
router.use("/3.0/api/topics", asyncHandler(controller.get, "topicsGet"));

export default router;
