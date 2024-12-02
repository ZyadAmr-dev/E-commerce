import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    seller: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    price: number;
    images: string[]; 
    category: string;
    subcategory: mongoose.Schema.Types.ObjectId;
    soldItems: number;
    stock: number;
    isAvailable: boolean,
    discount: number;
    netPrice: number;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
    seller: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    images: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "SubCategory"
    },
    soldItems: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    netPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, 
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
