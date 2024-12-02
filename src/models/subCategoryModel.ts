import mongoose, { Schema, Document } from 'mongoose';

export interface ISubCategory extends Document {
    name: string;
}

export const subCategorySchema: Schema<ISubCategory> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export const SubCategory = mongoose.model<ISubCategory>('SubCategory', subCategorySchema);
