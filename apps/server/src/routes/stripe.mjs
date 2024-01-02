import { Router } from "express";
import { paymentIntent } from "../controllers/stripe.mjs";

const router = Router();

router.route("/create-payment-intent").post(paymentIntent);

export default router;
