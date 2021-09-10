import express from "express";
import { getHello } from "../controllers/Hello";
import { asyncHandler } from "../lib/asyncHandler";

const router = express.Router();
router.use("/hello", asyncHandler(getHello, "getHello"));

export default router;
