import express from 'express';
const router = express.Router();

import { 
    signUp
} from '../Controllers/auth.controller.js';

//Signup
//POST /api/v1/auth/signup
router.post('/', signUp);


export default router;