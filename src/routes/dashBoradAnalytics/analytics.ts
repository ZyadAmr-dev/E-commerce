import express from "express"
import analyticsController from "../../controllers/analyticsController"
import { checkAdminRole } from "../../middlewares/adminAuthorization"
import { validateToken } from "../../middlewares/verifyToken"

const router = express.Router()

router.use(validateToken, checkAdminRole)

router.get('/analytics/sales', analyticsController.profitInInterval)

router.get('/analytics/aov', analyticsController.getAOV)

export default router