import { Router } from "express";
import authentication from "../middlewares/auth.mjs";
import { account, confirm } from "../controllers/user.mjs";
const router = Router();

router.route("/account").get(authentication, account);
router.route("/account/email-confirmation/:token").post(confirm);
// .post(authentication, confirm);

export default router;
