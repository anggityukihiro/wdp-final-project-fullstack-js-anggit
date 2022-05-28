import { Router } from "express";
import { refreshToken} from "../controllers/token_controller.js";

const router = Router();

router.get("/", refreshToken);

export default router;