import express from "express";
import * as controller from "../../controllers/2.0/Info";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/info/about", asyncHandler(controller.getAbout, "getAbout"));

export default router;
