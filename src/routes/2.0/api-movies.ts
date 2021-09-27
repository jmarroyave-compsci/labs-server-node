import express from "express";
import * as controller from "../../controllers/2.0/Movie";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/movie/:id", asyncHandler(controller.movieGet, "movieGet"));

export default router;
