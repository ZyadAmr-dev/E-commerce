import { Types } from "mongoose";
import FeedbackService from "./feedbackService"

class SearcOnCommentService {
    public static async search(text: string, prodId: Types.ObjectId) {
        try {
            const results = await FeedbackService.getCommentByIndex(text, prodId)
            return results
        } catch(err) {
            throw new Error(`Error searching comments: ${err.message}`);
        }
    }
}


export default SearcOnCommentService