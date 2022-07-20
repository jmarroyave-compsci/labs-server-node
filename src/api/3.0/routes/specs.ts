import express from "express";
import { getSpecs } from "v3/controllers/Docs";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/3.0/specs", asyncHandler(getSpecs, "getSpec"));

export default router;
