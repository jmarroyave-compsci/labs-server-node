import express from "express";
import * as controller from "../controllers/Movies";
import { asyncHandler } from "../lib/asyncHandler";

const router = express.Router();
router.use("/api/movies", asyncHandler(controller.moviesGet, "moviesGet"));

export default router;
