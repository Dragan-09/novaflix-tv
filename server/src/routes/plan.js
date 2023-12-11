const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");

const { getPlans, purchase, subscribe, trial } = require("../controllers/plan");

router.route("/plans").get(getPlans);
router.route("/plan/:id").post(authentication, purchase);
router.route("/subscribe/:plan/:user").get(subscribe);
router.route("/trial").post(authentication, trial);

module.exports = router;
