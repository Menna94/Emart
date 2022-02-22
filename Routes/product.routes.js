import express from 'express';
const router = express.Router();

import { 
    createProduct, 
    fetchProducts, 
    fetchAProduct, 
    getProductsCount,
    getFeaturedProducts,
    updateProduct,
    delProduct,
} from '../Controllers/product.controller.js';
import filterByModel from '../Middlewares/filterQuery.middleware.js';
import Product from '../Models/Product.model.js';

//Create A Product
//POST /api/v1/products
router.post('/', createProduct);

//Fetch All Products
//GET /api/v1/products
router.get('/',filterByModel(Product, 'category') , fetchProducts);

//Get The Products' Count
//GET /api/v1/products/count
router.get('/count', getProductsCount);

//Get The Featured Products
//GET /api/v1/products/featured
router.get('/featured/:limit', getFeaturedProducts);

//Fetch A Single Product
//GET /api/v1/products/:id
router.get('/:id', fetchAProduct);

//Update A Product 
//PUT /api/v1/products/:id
router.put('/:id', updateProduct);

//Delete A Product 
//DELETE /api/v1/products/:id
router.delete('/:id', delProduct)

export default router;