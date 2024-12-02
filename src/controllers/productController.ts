import { Request, Response, NextFunction } from "express"; 
import ProductService from "../services/productService";
import mongoose from "mongoose";
import searchService from "../services/searchOnProductService";
import { WishlistManager } from "../notifications/wishlist";

const ProductController = {
    getAllProducts: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const minPrice = parseFloat(req.query.minPrice as string) || 0;
        const maxPrice = parseFloat(req.query.maxPrice as string) || 999999;
        const rating = parseInt(req.query.rating as string) || -1;
        const category = String(req.query.category || '');

        try {
            const filter: any = {};
            if (category) {
                filter.category = category;
            }
            if (minPrice || maxPrice) {
                filter.price = { $gte: minPrice, $lte: maxPrice }; 
            }
            if (rating >= 0) {
                filter.rating = { $gte: rating };
            }

            const products = await ProductService.getProducts(filter);

            if(products.length <= 0){
                res.status(200).json({ success: true, data: [], message: 'No products'})
            }

            res.status(200).json({
                success: true,
                data: products,
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },

    getProduct: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const prodId = req.params.prodId;

        if (!mongoose.Types.ObjectId.isValid(prodId)) {
            res.status(400).json({ message: "Invalid product ID format" });
            return;
        }

        try {
            const productId = new mongoose.Types.ObjectId(prodId);

            const product = await ProductService.getProductById(productId);

            if (!product) {
                res.status(404).json({ message: "Product not found" }); 
                return;
            }

            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    },

    createProduct: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const productData = req.body
        
        try {
            const newProduct = ProductService.createProduct(productData)

            await searchService.indexDocument(newProduct);

            res.status(201).json({ success: true, message: 'Created Successfully' })
            return;
        } catch(err) {
            res.status(500).json({ success: false, message: 'couldnt create product' })
            return;
        }

    },

    deleteProduct: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const prodId = req.params.prodId;

        if (!mongoose.Types.ObjectId.isValid(prodId)) {
            res.status(400).json({ message: "Invalid product ID format" });
            return;
        }

        try {
            const productId = new mongoose.Types.ObjectId(prodId);

            const product = await ProductService.deleteProductById(productId);

            if (!product) {
                res.status(404).json({ message: "Could not delete it" }); 
                return;
            }

            res.status(204);
        } catch (err) {
            next(err);
        }
    },
    
    updateProduct: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const prodId = req.params.prodId
        const productData = req.body

        if (!mongoose.Types.ObjectId.isValid(prodId)) {
            res.status(400).json({ message: "Invalid product ID format" });
            return;
        }

        try {
            const productId = new mongoose.Types.ObjectId(prodId);

            const product = await ProductService.updateProductById(productId, productData);

            if (!product) {
                res.status(404).json({ message: "Could not update product" }); 
                return;
            }

            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    },

    getMyProducts: async (req, res, next): Promise<void> => {
        const userId = req.user.id;
    
        try {
            const products = await ProductService.getProductsBySellerId(userId);
    
            if (products.length === 0) {
                return res.status(404).json({ success: true, message: "No products found for this seller." });
            }
    
            res.status(200).json({ success: true, data: products });
        } catch (err) {
            console.error("Error fetching products:", err);
            res.status(500).json({ success: false, message: `Error fetching products: ${err.message}` });
        }
    },

    makeAvailable: async (req, res, next): Promise<void> => {
        const prodId = req.params.prodId;
        const userId = req.user.id

        if (!mongoose.Types.ObjectId.isValid(prodId)) {
            res.status(400).json({ success: false, message: "Invalid product ID format" });
            return;
        }

        try {
            const productId = new mongoose.Types.ObjectId(prodId);

            await ProductService.makeAvailable(productId);

            const wishlistManager = new WishlistManager();
            wishlistManager.markAvailable(productId); 

            res.status(200).json({
                success: true,
                message: "Product is now available and users have been notified."
            });
        } catch (error) {
            console.error("Error making product available:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

};

export default ProductController;
