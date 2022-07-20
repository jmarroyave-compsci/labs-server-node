import express from "express";
import { getSpecs } from "v2/controllers/Docs";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/2.0/specs", asyncHandler(getSpecs, "getSpec"));

export default router;
