import express from "express";
import { getDocs } from "v4/controllers/Docs";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/", asyncHandler(getDocs, "getDocs"));

export default router;
