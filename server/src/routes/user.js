const express = require("express");
const authentication = require("../middlewares/auth");
const { account } = require("../controllers/user");
const router = express.Router();

router.route("/account").get(authentication, account);

module.exports = router;
