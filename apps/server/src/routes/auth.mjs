import { Router } from "express";
const router = Router();

import { register, login, google } from "../controllers/user.mjs";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/google").post(google);

export default router;
