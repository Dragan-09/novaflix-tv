const express = require("express");
const router = express.Router();

const { getCategories } = require("../controllers/category");

router.route("/categories").get(getCategories);

module.exports = router;
