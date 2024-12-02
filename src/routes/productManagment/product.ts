import express from "express"
import ProductController from "../../controllers/productController"
import { checkAdminRole } from "../../middlewares/adminAuthorization"
import { validateToken } from "../../middlewares/verifyToken"

const router = express.Router()

router.get('/products', ProductController.getAllProducts)

router.get('/product/:prodId', ProductController.getProduct)

router.post('/product',validateToken, checkAdminRole ,ProductController.createProduct)

router.delete('/product/:prodId',validateToken, checkAdminRole, ProductController.deleteProduct)

router.patch('/product/:prodId',validateToken, checkAdminRole,ProductController.updateProduct)

router.get('/myProducts',validateToken, checkAdminRole,ProductController.getMyProducts)

router.patch('/products/:prodId/available', validateToken, checkAdminRole, ProductController.makeAvailable);

export default router