import express from "express";
import { getDocs } from "v1/controllers/Docs";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/1.0/", asyncHandler(getDocs, "getDocs"));

export default router;
