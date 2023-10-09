import express from "express";
import { get } from "../controllers/querySearch.controller.js";

const router = express.Router();

router.post("/get", get);
export default router;