import { Router } from "express";
import {
  voucher_verification,
} from "../controllers/voucher_controller.js";

const router = Router();

router.post("/", voucher_verification);

export default router;
