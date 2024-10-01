import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController";

const router = Router();
router.get("/metrics", getDashboard); // http://localhost:8000/dashboard/metrics
export default router;
