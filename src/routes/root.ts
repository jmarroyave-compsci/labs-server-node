import express from "express";
import { getRoot } from "../controllers/Info";
import { asyncHandler } from "../lib/asyncHandler";

const router = express.Router();
router.use("/", asyncHandler(getRoot, "getRoot"));

export default router;