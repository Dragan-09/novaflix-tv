const express = require("express");
const authentication = require("../middlewares/auth");
const { account, confirm } = require("../controllers/user");
const router = express.Router();

router.route("/account").get(authentication, account);
router.route("/account/email-confirmation/:token").post(confirm);
// .post(authentication, confirm);

module.exports = router;
