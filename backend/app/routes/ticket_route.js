import { Router } from "express";
import {
  get_ticket,
  add_ticket,
  update_ticket,
} from "../controllers/ticket_controller.js";

const router = Router();

router.get("/:ticket_id", get_ticket);

router.post("/", add_ticket);

router.put("/:ticket_id", update_ticket);

export default router;
