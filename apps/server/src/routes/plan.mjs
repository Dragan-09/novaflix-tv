import { Router } from "express";
const router = Router();
import authentication from "../middlewares/auth.mjs";
import verified from "../middlewares/verified.mjs";
import is_admin from "../middlewares/is_admin.mjs";

import {
  getPlan,
  getPlans,
  paypalCreateOrder,
  purchase,
  storeCredentials,
  subscribe,
  subscription_status,
  trial,
} from "../controllers/plan.mjs";

router.route("/plans").get(getPlans);
router.route("/plans/create-paypal-order").post(paypalCreateOrder);
router.route("/plan/:id").post(purchase);
router.route("/plan/:name").get(getPlan);
router
  .route("/subscription/credentials/:subscription")
  .post(authentication, is_admin, storeCredentials);
router
  .route("/subscription/status/:subscription")
  .get(authentication, is_admin, subscription_status);
router.route("/subscribe/:plan/:user?").get(subscribe);
router.route("/trial").post(authentication, verified, trial);

export default router;
