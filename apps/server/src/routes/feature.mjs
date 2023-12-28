import { Router } from "express";
import features from "../controllers/feature.mjs";

const router = Router();

router.route("/features").get(features);

export default router;
