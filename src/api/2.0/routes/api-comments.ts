import express from "express";
import * as controller from "v2/controllers/Comments";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/comments", asyncHandler(controller.addComment, "addComment"));

export default router;
