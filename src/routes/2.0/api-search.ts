import express from "express";
import * as controller from "../../controllers/2.0/Search";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/search/results", asyncHandler(controller.searchResultsGet, "searchResultsGet"));
router.use("/2.0/api/search/suggestions", asyncHandler(controller.searchSuggestionsGet, "searchSuggestionsGet"));

export default router;
