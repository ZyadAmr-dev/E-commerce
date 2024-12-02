import express from "express";
import wishlistController from "../../controllers/wishlistController";
import { validateToken } from "../../middlewares/verifyToken";
import { checkCustomerRole } from "../../middlewares/userAuthorization";

const router = express.Router()

router.use(validateToken)

router.get('/wishlist', checkCustomerRole, wishlistController.getItems)

router.post('/wishlist/:prodId', checkCustomerRole, wishlistController.addAnItem)

// router.patch('/wishlist/:prodId/available', wishlistController.markAvailable)

export default router