import { Router } from "express";
const router = Router();

import { getChannels } from "../controllers/channel.mjs";

router.route("/channels").get(getChannels);

export default router;
