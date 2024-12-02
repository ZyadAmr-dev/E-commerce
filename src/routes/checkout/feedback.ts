import express from "express";
import FeedbackController from "../../controllers/feedbackController";
import { validateToken } from "../../middlewares/verifyToken"
import { checkCustomerRole } from "../../middlewares/userAuthorization";

const router = express.Router()

router.get('/feedback/:prodId', FeedbackController.getAllReviews)

router.post('/feedback/:prodId', validateToken, checkCustomerRole, FeedbackController.createFeedback)

export default router