import { Router } from "express";
import { get_user} from "../controllers/getuser_controller.js";

const router = Router();

router.get("/", get_user);

export default router;