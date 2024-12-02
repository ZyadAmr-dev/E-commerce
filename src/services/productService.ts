import { Types } from 'mongoose';
import { Product, IProduct } from "../models/productModel";
import { FilterQuery } from "mongoose";

class ProductService {
    public static async getProductById(id: Types.ObjectId): Promise<IProduct | null> {
        try {
            return await Product.findById(id);
        } catch (err) {
            throw new Error(`Error fetching product by ID: ${(err as Error).message}`);
        }
    }

    public static async deleteProductById(id: Types.ObjectId): Promise<{ acknowledged: boolean; deletedCount: number }> {
        try {
            return await Product.deleteOne({ _id: id });
        } catch (err) {
            throw new Error(`Error deleting product by ID: ${(err as Error).message}`);
        }
    }

    public static async getProduct(fields: FilterQuery<IProduct>): Promise<IProduct | null> {
        try {
            return await Product.findOne(fields, {_id: 0, title: 1, description: 1, price: 1, images: 1, category: 1, subcategory: 1});
        } catch (err) {
            throw new Error(`Error fetching product: ${(err as Error).message}`);
        }
    }

    public static async getProducts(fields: FilterQuery<IProduct>): Promise<IProduct[] | null> {
        try {
            return await Product.find(fields, {_id: 0, title: 1, description: 1, price: 1, images: 1, category: 1, subcategory: 1}).lean() as IProduct[]
        } catch(err) {
            throw new Error(`Error fetching products: ${(err as Error).message}`);
        }
    }

    public static async updateProductById(id: Types.ObjectId, fields: Partial<IProduct>): Promise<{ acknowledged: boolean; modifiedCount: number }> {
        try {
            const result = await Product.updateOne({ _id: id }, { $set: fields });
            return {
                acknowledged: result.acknowledged,
                modifiedCount: result.modifiedCount,
            };
        } catch (err) {
            throw new Error(`Error updating product by ID: ${(err as Error).message}`);
        }
    }

    public static async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
        const product = new Product(productData);
        return await product.save();
    }

    public static async getProductsBySellerId(userId: Types.ObjectId): Promise<IProduct[] | null> {

        try {
            return await Product.find({ seller: userId});
        } catch (err) {
            throw new Error(`Error fetching product by ID: ${(err as Error).message}`);
        }
    }

    public static async makeAvailable(id: Types.ObjectId) {
        try {
            const existingItem = await Product.findById(id)

            existingItem.isAvailable = true

            await this.updateProductById(id, existingItem)
        } catch(err) {
            throw new Error(`Error fetching product by ID: ${(err as Error).message}`);
        }
    }
}

export default ProductService;
