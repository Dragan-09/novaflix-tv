const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/auth");

const { getPlans, purchase, subscribe } = require("../controllers/plan");

router.route("/plans").get(getPlans);
router.route("/plan/:id").post(authentication, purchase);
router.route("/subscribe/:plan/:user").get(subscribe);

module.exports = router;
