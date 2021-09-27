import express from "express";

const router = express.Router();
router.use("/1.0/specs", express.static(`${__dirname}/../../files/api.v.1.0.yaml`));

export default router;
