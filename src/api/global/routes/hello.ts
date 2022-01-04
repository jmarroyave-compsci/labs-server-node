import express from "express";
import { getHello } from "api/global/controllers/Info";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/hello", asyncHandler(getHello, "getHello"));

export default router;
