import express from "express";
import * as controller from "v4/controllers/Search";
import { asyncHandler } from "lib/asyncHandler";

const router = express.Router();
router.use("/4.0/api/search/results", asyncHandler(controller.searchResultsGet, "searchResultsGet"));
router.use("/4.0/api/search/suggestions", asyncHandler(controller.searchSuggestionsGet, "searchSuggestionsGet"));

export default router;
