import mongoose, { Schema, Document } from 'mongoose';

interface IProduct {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

interface ICart extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    products: IProduct[]; 
    totalPrice: number;
}

const cartSchema: Schema<ICart> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product' 
        },
        quantity: {
            type: Number,
            required: true,
            min: 1 
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0 
    }
});

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
