import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    prodId: mongoose.Schema.Types.ObjectId;
    rate?: number;
    comment?: string;
}

const feedbackSchema: Schema<IFeedback> = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    prodId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
});

feedbackSchema.index({ comment: 'text' });

export const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);
