import express from "express";
import { getDocs } from "v2/controllers/Docs";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/2.0/", asyncHandler(getDocs, "getDocs"));

export default router;
