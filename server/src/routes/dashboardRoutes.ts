import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController";

const router = Router();
router.get("/", getDashboard); // http://localhost:8000/dashboard/
export default router;
