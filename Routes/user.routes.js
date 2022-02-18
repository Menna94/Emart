import express from 'express';
const router = express.Router();

import { 
    fetchUsers,
    fetchAUser,
    delUser
} from '../Controllers/user.controller.js';

//Fetch All Users
//GET /api/v1/users
router.get('/', fetchUsers);

//Fetch A Single User
//GET /api/v1/users/:id
router.get('/:id', fetchAUser);

//Delete A User
//DELETE /api/v1/users/:id
router.delete('/:id', delUser)

export default router;