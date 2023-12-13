const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");
const verified = require("../middlewares/verified");

const { getPlans, purchase, subscribe, trial } = require("../controllers/plan");

router.route("/plans").get(getPlans);
router.route("/plan/:id").post(authentication, verified, purchase);
router.route("/subscribe/:plan/:user").get(subscribe);
router.route("/trial").post(authentication, verified, trial);

module.exports = router;
