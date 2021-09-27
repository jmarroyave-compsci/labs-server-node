import express from "express";

const router = express.Router();
router.use("/2.0/docs", express.static(`${__dirname}/../../files/docs/index.v.2.0.html`));

export default router;
