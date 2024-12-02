import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone: string;
    address?: {
        street: string;
        city: string;
    };
    role: 'customer' | 'admin';
    isConfirmed: boolean;
    subscribed: boolean;
}


const userSchema: Schema<IUser> = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        required: true,
        default: 'customer',
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    subscribed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, 
});

export const User = mongoose.model<IUser>("User", userSchema);
