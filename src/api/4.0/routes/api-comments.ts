import express from "express";
import * as controller from "v4/controllers/Comments";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/api/comments", asyncHandler(controller.addComment, "addComment"));

export default router;
