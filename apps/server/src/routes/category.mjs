import { Router } from "express";
const router = Router();

import { getCategories } from "../controllers/category.mjs";

router.route("/categories").get(getCategories);

export default router;
