import express from 'express';
import dotenv from 'dotenv';

dotenv.config({path: './configs/.env'});

const app = express();
const port = 3000 || process.env.PORT;


app.listen(port, ()=>{
    console.log(`App is listening on ${port}`);
})

