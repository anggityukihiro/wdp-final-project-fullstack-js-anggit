import { Router } from "express";
import {
  get_events
} from "../controllers/event_controller.js";

const router = Router();

router.get("/", get_events);

export default router;
