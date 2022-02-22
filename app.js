//.env configs
import dotenv from 'dotenv';
dotenv.config({path: './configs/.env'});
//external modules
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//Routes
import productRoutes from './Routes/product.routes.js';
import categoryRoutes from './Routes/category.routes.js';
import orderRoutes from './Routes/order.routes.js';
import authRoutes from './Routes/auth.routes.js';
import userRoutes from './Routes/user.routes.js';


//db
import dbConnection from './configs/db.js';
import protect from './Middlewares/auth.middleware.js';
import errorHandler from './Middlewares/errorHandler.middleware.js';
dbConnection();

const app = express();
const port = 3000 || process.env.PORT;

//cors configs
app.use(cors());
app.options('*', cors());

const api = '/api/v1';

//middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(api, protect());
app.use(errorHandler);

//mount routes
app.use(`${api}/products`, productRoutes);
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/orders`, orderRoutes);
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/users`, userRoutes);


//run server
app.listen(port, ()=>{
    console.log(`App is listening on ${port}`);
})

