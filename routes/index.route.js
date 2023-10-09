import express from "express";

const router = express.Router();

import bruteforce from "./bruteforce.route.js";
import querySearch from "./querySearch.route.js";

router.use("/bruteforce", bruteforce);
router.use("/querySearch", querySearch);

export default router;