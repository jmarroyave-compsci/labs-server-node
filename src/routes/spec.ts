import express from "express";

const router = express.Router();
router.use("/spec", express.static(`${__dirname}/../files/api.yaml`));

export default router;
