import mongoose from "mongoose";

export default async () =>{
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
            useUnifiedTopology:true,
            useNewUrlParser:true,
        });

        if(!conn){
            console.log(`(X) ERROR Occured While Connecting To Database!`);
        }

        console.log('Connected To Database SUCCESSFULLY');

    }
    catch(err){
        console.log(`(X) Something Went Wrong While Trying To Connect To The Server! : ${err.message}`);
    }
}