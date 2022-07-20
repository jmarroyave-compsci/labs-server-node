import express from "express";
import { getInfo } from "api/global/controllers/Info";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/info", asyncHandler(getInfo, "getInfo"));

export default router;
