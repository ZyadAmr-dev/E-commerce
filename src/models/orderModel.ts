import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    cartId: mongoose.Schema.Types.ObjectId; 
    status: 'pending' | 'onWay' | 'delivered' | 'cancelled'; 
    totalPrice: number; 
}

const orderSchema: Schema<IOrder> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart' 
    },
    status: {
        type: String,
        enum: ['pending', 'onWay', 'delivered', 'cancelled'], 
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0 
    }
}, {
    timestamps: true, 
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
