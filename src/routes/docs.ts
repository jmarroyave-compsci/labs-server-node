import express from "express";

const router = express.Router();
router.use("/docs", express.static(`${__dirname}/../files/docs`));

export default router;
