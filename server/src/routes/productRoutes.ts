import { Router } from "express";
import { getProducts, createProduct } from "../controllers/productController";

// http://localhost:8000/products/
const router = Router();
router.get("/", getProducts);
router.post("/", createProduct);

export default router;
