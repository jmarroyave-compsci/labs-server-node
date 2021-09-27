import express from "express";

const router = express.Router();
router.use("/1.0/docs", express.static(`${__dirname}/../../files/docs/index.v.1.0.html`));

export default router;
