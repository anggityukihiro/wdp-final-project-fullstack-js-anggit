import { Router } from "express";
import {
  get_event,
  get_events,
} from "../controllers/event_controller.js";

const router = Router();

router.get("/", get_events);

router.get("/:event_id", get_event);

export default router;
