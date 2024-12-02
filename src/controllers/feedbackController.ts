import { Request, Response, NextFunction } from "express"; 
import FeedbackService from "../services/feedbackService";
import mongoose from "mongoose";

const FeedbackController = {
    getAllReviews: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const prodId = req.params.prodId

        try {
            const productId = new mongoose.Types.ObjectId(prodId)

            const reviews = await FeedbackService.getFeedbacks(productId)

            if(reviews.length == 0){
                res.status(200).json({ success: true, data: reviews, message: "No products found" })
                return;
            }
            
            res.status(200).json({
                reviews: reviews
            })
        } catch(err) {
            next(err);
        }
    },

    createFeedback: async (req, res, next): Promise<void> => {
        const userId = req.user.id;
        const prodId = req.params.prodId;
        const { rate, comment } = req.body;
    
        try {
            const newReview = await FeedbackService.createFeedback({ userId, prodId, rate, comment });
            
            res.status(201).json({
                message: 'Feedback created successfully',
                feedback: newReview,
            });
        } catch (err) {
            next(err);
        }
    }

    
}

export default FeedbackController