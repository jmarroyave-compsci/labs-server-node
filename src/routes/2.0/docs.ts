import express from "express";

const router = express.Router();
router.use("/docs", express.static(`${__dirname}/../../files/docs/index.v.2.0.html`));

export default router;
