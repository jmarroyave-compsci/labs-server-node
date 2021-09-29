import express from "express";
import { getSpecs } from "../../controllers/1.0/Docs";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/1.0/specs", asyncHandler(getSpecs, "getSpec"));

export default router;
