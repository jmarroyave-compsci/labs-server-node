import express from "express";
import { getSpecs } from "v4/controllers/Docs";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/specs", asyncHandler(getSpecs, "getSpec"));

export default router;
