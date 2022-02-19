import express from 'express';
const router = express.Router();

import { 
    login,
    signUp
} from '../Controllers/auth.controller.js';

//Signup
//POST /api/v1/auth/signup
router.post('/signup', signUp);

//Login
//POST /api/v1/auth/login
router.post('/login', login);

export default router;