import { ObjectId, Types } from "mongoose";
import { Wishlist, IWishlist } from "../models/wishlistModel";

class WishlistService {
    public static async getWishlist(userId: Types.ObjectId): Promise<IWishlist | null> {
        try {
            return await Wishlist.findOne({ customer: userId }).populate("items").exec();
        } catch (err) {
            throw new Error(`Error fetching wishlist: ${(err as Error).message}`);
        }
    }
    
    public static async addItem(userId: Types.ObjectId, prodId: Types.ObjectId): Promise<IWishlist> {
        try {
            const wishlist = await Wishlist.findOneAndUpdate(
                { customer: userId },
                { $addToSet: { items: prodId } },
                { new: true, upsert: true }
            );
            return wishlist;
        } catch (err) {
            throw new Error(`Error adding item to wishlist: ${(err as Error).message}`);
        }
    }    

    public static async removeItem(userId: Types.ObjectId, prodId: Types.ObjectId): Promise<void> {
        try {
            const result = await Wishlist.updateOne(
                { customer: userId },
                { $pull: { items: prodId } }
            );
            if (result.modifiedCount === 0) {
                throw new Error('Item not found in wishlist');
            }
        } catch (err) {
            throw new Error(`Error removing item from wishlist: ${(err as Error).message}`);
        }
    }    

    public static async checkItem(userId: Types.ObjectId, prodId: Types.ObjectId): Promise<boolean> {
        try {
            const item = await Wishlist.findOne({ userId, prodId }).exec();
            return item !== null;
        } catch (err) {
            throw new Error(`Error checking item in wishlist: ${(err as Error).message}`);
        }
    }

    public static async getItem(userId: Types.ObjectId, prodId: Types.ObjectId): Promise<IWishlist | null> {
        try {
            return await Wishlist.findOne({ userId, prodId }).exec();
        } catch (err) {
            throw new Error(`Error fetching item from wishlist: ${(err as Error).message}`);
        }
    }

    public static async updateItem(userId: Types.ObjectId, oldProdId: Types.ObjectId, newProdId: Types.ObjectId): Promise<IWishlist | null> {
        try {
            const updatedItem = await Wishlist.findOneAndUpdate(
                { userId, prodId: oldProdId },
                { prodId: newProdId },
                { new: true } 
            ).exec();

            if (!updatedItem) {
                throw new Error('Item not found in wishlist for update');
            }

            return updatedItem;
        } catch (err) {
            throw new Error(`Error updating item in wishlist: ${(err as Error).message}`);
        }
    }
}

export default WishlistService;
