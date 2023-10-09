import express from "express";
import { guess, create } from "../controllers/bruteforce.controller.js";

const router = express.Router();

router.post("/guess", guess);
router.post("/create", create);

export default router;