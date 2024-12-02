import { Types } from 'mongoose';
import { Feedback, IFeedback } from "../models/feedbackModel";
import { FilterQuery } from "mongoose";

class FeedbackService {
    public static async getFeedbacks(prodId: Types.ObjectId): Promise<IFeedback[]> {
        try {
            const feedbacks = await Feedback.find({ prodId }).exec();
            return feedbacks;
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            throw new Error("Failed to fetch feedbacks");
        }
    }

    public static async createFeedback(feedbackData: Partial<IFeedback>): Promise<IFeedback> {
        try {
            const newFeedback = new Feedback(feedbackData);
            await newFeedback.save();
            return newFeedback;
        } catch (error) {
            console.error("Error creating feedback:", error);
            throw new Error("Failed to create feedback");
        }
    }

    public static async updateFeedback(feedbackId: Types.ObjectId, updateData: Partial<IFeedback>): Promise<IFeedback | null> {
        try {
            const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updateData, { new: true }).exec();
            return updatedFeedback;
        } catch (error) {
            console.error("Error updating feedback:", error);
            throw new Error("Failed to update feedback");
        }
    }

    public static async deleteFeedback(feedbackId: Types.ObjectId): Promise<void> {
        try {
            await Feedback.findByIdAndDelete(feedbackId).exec();
        } catch (error) {
            console.error("Error deleting feedback:", error);
            throw new Error("Failed to delete feedback");
        }
    }

    public static async avgRating(): Promise<any[]> {
        try {
            const result = await Feedback.aggregate([
                {
                    $group: {
                        _id: '$prodId',
                        averageRating: { $avg: '$rate' },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        prodId: '$_id',
                        averageRating: 1,
                    }
                }, 
                {
                    $sort: {
                        averageRating: -1
                    }
                }
            ]);
    
            return result; 
        } catch (err) {
            console.error("Error in aggregateRating:", err);
            throw err; 
        }
    }

    public static async countRatingPerProduct(prodId: Types.ObjectId): Promise<any[]> {
        try {
            const result = await Feedback.aggregate([
                { 
                    $match: { prodId } 
                },
                {
                    $group: {
                        _id: '$rate',
                        countRating: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: -1 }
                }
            ]);
    
            return result;
        } catch (err) {
            console.error("Error in countRating:", err);
            throw err;
        }
    }
    
    public static async getCommentByIndex(text: string, prodId: Types.ObjectId): Promise<string[]> {
        try {
            const results = await Feedback.find({ $text: { $search: text }, prodId: prodId }).exec();
    
            return results.map(feedback => feedback.comment).filter(comment => comment !== null);
        } catch (err) {
            throw new Error(`Error fetching comments: ${err.message}`);
        }
    }
}

export default FeedbackService;
