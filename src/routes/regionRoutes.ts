import { Router } from "express";
import { regionController } from "../controllers/regionController.js";
import { authController } from "../controllers/authController.js";

const router = Router();

router.get("/regions", regionController.getAllRegions);
router.get("/regions/:id", regionController.getRegionById);

export const regionRoutes = router;
