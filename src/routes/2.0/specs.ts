import express from "express";

const router = express.Router();
router.use("/2.0/specs", express.static(`${__dirname}/../../files/api.v.2.0.yaml`));

export default router;
