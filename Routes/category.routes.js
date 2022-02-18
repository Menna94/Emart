import express from 'express';
const router = express.Router();

import { 
    createCategory,  
    fetchCategories,
    fetchACategory,
    updateCategory,
    delCategory,
} from '../Controllers/category.controller.js';

//Create A Category
//POST /api/v1/categories
router.post('/', createCategory);

//Fetch All Categories
//GET /api/v1/categories
router.get('/', fetchCategories);

//Fetch A Single Category
//GET /api/v1/categories/:id
router.get('/:id', fetchACategory);

//Update A Category
//PUT /api/v1/categories/:id
router.put('/:id', updateCategory);

//Delete A Category
//DELETE /api/v1/categories/:id
router.delete('/:id', delCategory);

export default router;