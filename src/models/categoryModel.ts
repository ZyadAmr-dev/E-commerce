import mongoose, { Schema, Document } from 'mongoose';
import { ISubCategory, subCategorySchema } from './subCategoryModel';

export interface ICategory extends Document {
    subCategories: ISubCategory[]; 
}

const categorySchema: Schema<ICategory> = new mongoose.Schema({
    subCategories: [subCategorySchema], 
}, {
    timestamps: true, 
});

// Export the Category model
export const Category = mongoose.model<ICategory>('Category', categorySchema);
