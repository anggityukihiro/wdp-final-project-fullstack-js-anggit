import { Router } from "express";
import {
  get_payment_methods
} from "../controllers/payment_method_controller.js";

const router = Router();

router.get("/", get_payment_methods);

export default router;
