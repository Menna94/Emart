import express from 'express';
const router = express.Router();

import { 
    fetchUsers,
    fetchAUser,
    delUser,
    updateUser
} from '../Controllers/user.controller.js';
import filterByModel from '../Middlewares/filterQuery.middleware.js';
import User from '../Models/User.model.js';

//Fetch All Users
//GET /api/v1/users
router.get('/', filterByModel(User) ,fetchUsers);

//Fetch A Single User
//GET /api/v1/users/:id
router.get('/:id', fetchAUser);

//Update A User
//PUT /api/v1/users/:id
router.put('/:id', updateUser);

//Delete A User
//DELETE /api/v1/users/:id
router.delete('/:id', delUser)

export default router;