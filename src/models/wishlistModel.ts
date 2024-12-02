import mongoose, { Schema, Document } from 'mongoose';

export interface IWishlist extends Document {
    prodId(userId: any, prodId: any, prodId1: any): unknown;
    isAvailable: boolean;
    customer: mongoose.Schema.Types.ObjectId;
    items: mongoose.Schema.Types.ObjectId[];
}

const wishlistSchema = new mongoose.Schema({
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        }
    ]
});

export const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);