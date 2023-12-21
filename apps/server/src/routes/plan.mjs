import { Router } from "express";
const router = Router();
import authentication from "../middlewares/auth.mjs";
import verified from "../middlewares/verified.mjs";

import { getPlans, purchase, subscribe, trial } from "../controllers/plan.mjs";

router.route("/plans").get(getPlans);
router.route("/plan/:id").post(authentication, verified, purchase);
router.route("/subscribe/:plan/:user").get(subscribe);
router.route("/trial").post(authentication, verified, trial);

export default router;
