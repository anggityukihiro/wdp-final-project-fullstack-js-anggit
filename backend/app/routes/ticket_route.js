import { Router } from "express";
import {
  get_ticket,
  add_ticket,
  update_ticket,
} from "../controllers/ticket_controller.js";

const router = Router();

router.get("/:user_id", get_ticket);

router.post("/", add_ticket);

router.put("/", update_ticket);

export default router;
