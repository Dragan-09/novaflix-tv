const express = require("express");
const router = express.Router();

const { getChannels } = require("../controllers/channel");

router.route("/channels").get(getChannels);

module.exports = router;
