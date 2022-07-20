import express from "express";
import { getDocs } from "v3/controllers/Docs";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/3.0/", asyncHandler(getDocs, "getDocs"));

export default router;
